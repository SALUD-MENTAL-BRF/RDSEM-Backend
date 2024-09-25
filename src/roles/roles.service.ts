import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService,) {}

    getRoles(){
      return this.prismaService.role.findMany()
    }
}
