import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocuments = HydratedDocument<User> ;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  token: string;
}
export const UserSchema = SchemaFactory.createForClass(User);