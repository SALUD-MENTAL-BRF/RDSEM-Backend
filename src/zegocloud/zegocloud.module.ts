import { Module } from '@nestjs/common';
import { ZegocloudService } from './zegocloud.service';
import { ZegocloudController } from './zegocloud.controller';

@Module({
  controllers: [ZegocloudController],
  providers: [ZegocloudService],
})
export class ZegocloudModule {}
