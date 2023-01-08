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
  async validateToken(@Body() validateUserDto: CreateUserDto) { 
    const tokens = await this.usersService.validateToken(validateUserDto.token);
    console.log(tokens)
    return tokens;
  }
  
  @Post('/email')
  async loginEmail(@Body() loginEmailUserDto: CreateUserDto) {
    return this.usersService.loginEmail(loginEmailUserDto.email);
  }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/reset')
  reset (@Body() resetUserDto: CreateUserDto) {
    return this.usersService.reset(resetUserDto.email);
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
