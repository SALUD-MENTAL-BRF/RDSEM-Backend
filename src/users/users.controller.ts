import { Controller, Get, Post, Body, Param, Put, UseInterceptors, Req, Res, UploadedFile, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('/')
  async CreateUser(@Body() user: any) {
    try {
      const newUser = await this.usersService.createUser(user);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('/')
  async GetUsers() {
    return await this.usersService.findAll();
  }

  @Get('/UsersHospitals')
  async getUserHospitals() {

    try {
      const users = await this.usersService.findAllUsersHospitals();
      if(!users) {
        throw new BadRequestException('No se encontraron usuarios con hospitales.');
      }
      return users;
    } catch (err) {
      return { success: false, message: err.message };
    }

  }

  @Get('/:id')
  async GetUserById(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id, 10));
  }

  @Put('/:id')
  async UpdateUser(@Param('id') id: string, @Body() user: any) {
    try {
      const updatedUser = await this.usersService.updateUser(parseInt(id, 10), user);

      if (!updatedUser) {
        throw new BadRequestException('No se pudo editar el usuario.');
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('/:email')
  async GetUser(@Param('email') email: string) {
    return await this.usersService.findOneByEmail(email);
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

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const numericId = parseInt(id);
  
    if (isNaN(numericId)) {
      throw new BadRequestException('ID inválido');
    }
  
    const response = await this.usersService.deleteUser(numericId);
    return response;
  }
  
}
