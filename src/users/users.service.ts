import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export interface User{
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}

  GetAllUsers(){
    return this.prismaService.user.findMany()
  }

  CreateUser(User: any){
    
    return this.prismaService.user.create({
      data: User
    });
  }


}
