import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  GetAllUsers() {
    return this.usersService.GetAllUsers();
  }

  @Post('/')
  CreateUser(@Body() User: any, @Req() request: Request, @Res() response: Response) {
    response.status(200).json({ User });
  }

}
