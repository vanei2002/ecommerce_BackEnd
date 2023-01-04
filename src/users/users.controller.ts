import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post('/singin')
  async login(@Body() loginUserDto: CreateUserDto) {

    const LoginAuth = await  this.usersService.login(loginUserDto.email, loginUserDto.password);
    return LoginAuth;
  }

  @Post('/token')
  async validateToken(@Body() token: string) {
    const tokenAuth = await this.usersService.validateToken(token);
    return tokenAuth;
  }
 

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try{
      return this.usersService.update(id, updateUserDto);
    }catch(err){ return Error(err);}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
