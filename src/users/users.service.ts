import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocuments, } from './schema/user.schema';
import { Model } from 'mongoose';


const sgMail = require("@sendgrid/mail")

sgMail.setApiKey("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")
@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name)private userModel: Model<UserDocuments>){}

  async login(email: string, password: string) {
       
    const user = await this.userModel.findOne({email, password});
    return user? user : `Usuario não encontrado cadastrad0`;
  }

  async create(createUserDto: CreateUserDto) {
    const validateUser = await this.userModel.findOne({email : createUserDto.email});

    console.log(createUserDto)
    if(validateUser)return `Usuário já cadastrado`

    const user = new this.userModel(createUserDto); 
    return user.save();
 
  }

  validateToken(token: string) {
    return this.userModel.findOne({
      token: token
    });
  }

  loginEmail(email: string){
    this.userModel.findOne({email})
    return true
  }

  async reset(email: string) {

    const user = await this.userModel.findOne({email});

    if(user) {

      await this.userModel.updateOne(({email, password:"Vanei Mendes"}))

      const message = ({
        to: email,
        from: "vanei.jesus016@gmail.com",
        subject: "Reset de Email",
        text: "texte de email",
        html: "Email recebido"
      })

      sgMail.send(message).then(e => console.log(e));
    
      return "Email enviado"
    } else {
      return `Email não encontrado`;
    }
  }



  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string , updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id }, {  $set: updateUserDto }, { new: true}
    );
  }

  remove(id: string ) {
    return this.userModel.deleteOne({ _id: id}).exec();
  }


}
