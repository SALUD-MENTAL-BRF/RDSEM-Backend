import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const USERS: User[] = [{ id: 1, name: 'John Doe' }];

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

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

  async findOne(id: number) {
    return USERS.find(user => user.id === id);
  }
}
