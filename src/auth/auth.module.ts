import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService]
})
export class AuthModule {}
