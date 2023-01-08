import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocuments, } from './schema/user.schema';
import { Model } from 'mongoose';


const sgMail = require('@sendgrid/mail');

/* sgMail.setApiKey("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")
 */sgMail.setApiKey("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")
@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name)private userModel: Model<UserDocuments>){}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({email, password});
    return user? user : `Usuario não encontrado`;
  }

  async loginEmail(email: string){

    const user = await this.userModel.findOne({email})
    return user?  user : false;
  }

  async create(createUserDto: CreateUserDto) {
    const validateUser = await this.userModel.findOne({email : createUserDto.email});

    console.log(createUserDto)
    if(validateUser)return `Usuário já cadastrado`

    const user = new this.userModel(createUserDto); 
    return user.save();
 
  }

  async validateToken(token: string) {
    const user = await this.userModel.findOne({token});
    console.log(user)
    return user? user : `Token não encontrado`;
  }

  async reset(email: string) {

    const user = await this.userModel.findOne({email});

    if(user) {

      await this.userModel.updateOne(({email, password:"Vanei Mendes"}))

      const msg = ({
        to: email,
        from: "vanei.jesus016@gmail.com",
        subject: "Reset de Email",
        text: "texte de email",
        html: "Email recebido"
      })

      sgMail.send(msg)
      .then(e => console.log("Email sent " + e.response))
      .catch(e => console.log("Error; " + e))
    
      return true
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
