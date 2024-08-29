import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsUserIdValidConstraint } from './validations/is-user-id-valid.constraint';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'; 

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUserIdValidConstraint, PrismaService],
  imports: [CloudinaryModule],
  exports: [UsersService], 
})
export class UsersModule {}
