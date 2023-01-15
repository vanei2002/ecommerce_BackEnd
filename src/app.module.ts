import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({

  imports: [
    // MongooseModule.forRoot(`mongodb+srv://vaneiMendes:94869709@cluster0.vg2t9p7.mongodb.net/ecommerce`),
    MongooseModule.forRoot(`mongodb+srv://vaneiMendes:94869709@cluster0.1hrhk2e.mongodb.net/ecommerce`),
    UsersModule,
  ],

})

export class AppModule {}
