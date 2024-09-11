import { Controller, Get, Post, Body, Param, Put, UseInterceptors, Req, Res, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

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

  @Get('/token/:token')
  async GetUserByToken(@Param('token') token: string) {
    if (!token) {
      return null;
    }
    const user = await this.usersService.findOneByToken(token);
    return user;
  }

  @Put('/image/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfileImageUser(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response
  ) {
    if (!file) {
      return response.status(400).json({ msg: 'No se ha seleccionado un archivo.' });
    }

    try {
      const imageUrl = await this.usersService.updateImage(parseInt(userId, 10), file);
      return response.status(200).json({ imageUrl });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
