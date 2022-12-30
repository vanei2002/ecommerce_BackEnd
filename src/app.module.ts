import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vaneiMendes:94869709@cluster0.vg2t9p7.mongodb.net/test'),
    UsersModule,
  ],

})

export class AppModule {}
