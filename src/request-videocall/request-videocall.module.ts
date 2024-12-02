import { Module } from '@nestjs/common';
import { RequestVideocallService } from './request-videocall.service';
import { RequestVideocallController } from './request-videocall.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [RequestVideocallController],
  providers: [RequestVideocallService],
})
export class RequestVideocallModule {}