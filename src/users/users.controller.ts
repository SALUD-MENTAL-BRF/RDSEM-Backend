import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async GetAllUsers() {
    return await this.usersService.GetAllUsers();
  }

  @Get('/:email')
  async GetUser(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @Post('/')
  async CreateUser(@Body() user: any) {
    try {
      const newUser = await this.usersService.CreateUser(user);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
