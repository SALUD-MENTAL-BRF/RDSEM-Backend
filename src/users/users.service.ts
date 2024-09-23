// src/users/users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants/jwt.constant'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  createUser(User: CreateUserDto) {

    return this.prismaService.user.create({
      data: {
        username: User.username,
        email: User.email,
        password: User.password,
        googleId: User.googleId,
        imageUrl: User.imageUrl,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
  
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findOneByToken(token: string) {
    const decodedToken = jwt.decode(token) as { id: string };

    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedException('Token inválido o malformado');
    }

    const user = await this.findOne(parseInt(decodedToken.id))

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
    
  }

 
  async updateImage(id: number, file: Express.Multer.File): Promise<string> {
    return await this.cloudinaryService.uploadImage(file).then(async (result) => {
      if (!result || !result.secure_url) {
        throw new BadRequestException('Error uploading image.');
      }

      await this.prismaService.user.update({
        where: {id:id},
        data: {
          imageUrl: result.secure_url
        }
      })

      return result.secure_url;
    }).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id: userId },
      });
  
      return { success: true };
    } catch (error) {
      throw new BadRequestException('Usuario no encontrado');
    }
  }
  
  

}