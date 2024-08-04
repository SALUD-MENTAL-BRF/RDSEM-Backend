import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:email')
  async GetUser(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @Post('/')
  async CreateUser(@Body() user: any) {
    try {
      const newUser = await this.usersService.createUser(user);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
