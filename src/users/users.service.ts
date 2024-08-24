// src/users/users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants/jwt.constant'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async findOneByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

}
