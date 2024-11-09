// src/users/users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants/jwt.constant'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  async createUser(User: CreateUserDto) {
    let hashedPassword: string | null = null
    
    if (User.password) {
      hashedPassword = await bcryptjs.hash(User.password, 10);
    }

    return this.prismaService.user.create({
      data: {
        username: User.username,
        email: User.email,
        password: hashedPassword,
        googleId: User.googleId,
        imageUrl: User.imageUrl,
        roleId: User.roleId ? User.roleId : 5
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany({
      include: {
        rol: {
          select: {
            type: true,
          },
        },
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
      include: {
        rol: {
          select: {
            type: true
          }
        },
        hospital: {
          select: {
            id: true,
          }
        }
      }
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
      await this.prismaService.user.delete({
        where: { id: userId },
      });
  
      return { success: true };
    } catch (error) {
      throw new BadRequestException('Usuario no encontrado');
    }
  }

  async findAllUsersHospitals() {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          roleId: 2
        }
      })

      return users;
    } catch (err) {
      throw new BadRequestException('Error al consultar los usuarios de hospitales');
    }
  }
  
}