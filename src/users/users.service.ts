// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService:CloudinaryService
  ) {}

  createUser(User: CreateUserDto) {
    // console.log(User.username);
    // console.log(User.email);
    // console.log(User.password);
    // console.log(User.googleId);
    // console.log(User.imageUrl);

    
    return this.prismaService.user.create({
      data: {
        username: User.username,
        email: User.email,
        password: User.password,
        googleId: User.googleId,
        imageUrl: User.imageUrl
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  // findOneByUsername(username: string) {
  //   return this.prismaService.user.findUnique({
  //     where: { username },
  //   });
  // }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async findOne(id: number){
    return this.prismaService.user.findUnique({
      where: { id },
    });
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
}
