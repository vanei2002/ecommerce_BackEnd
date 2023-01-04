import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocuments, } from './schema/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {

  constructor( @InjectModel(User.name)private userModel: Model<UserDocuments>){}

  async login(email: string, password: string) {
       
    const user = await this.userModel.findOne({email: email, password: password}).exec();
    return user? user : `Usuario não encontrado cadastrad0`;
  }

  validateToken(token: string) {
    return this.userModel.findOne({
      token: token
    });
  }

  create(createUserDto: CreateUserDto) {
    const user= new this.userModel(createUserDto);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string , updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { 
        _id: id 
      },
      { 
        $set: updateUserDto
      }, 
      { 
        new: true 
      });
  }

  remove(id: string ) {
    return this.userModel.deleteOne({ _id: id}).exec();
  }


}
