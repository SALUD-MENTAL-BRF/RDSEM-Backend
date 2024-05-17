import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const USERS: User[] = [{ id: 1, name: 'John Doe' }];

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  CreateUser(User: any) {
    return this.prismaService.user.create({
      data: {
        username: User.username,
        email: User.email,
        password: User.password,
      },
    });
  }

  findOneByEmail(Email: any) {
    return this.prismaService.user.findUnique({
      where: {
        email: Email,
      },
    });
  }

  findOneByUsername(Username: any) {
    return this.prismaService.user.findUnique({
      where: {
        username: Username,
      },
    });
  }

  async findOne(id: number) {
    return USERS.find(user => user.id === id);
  }
}
