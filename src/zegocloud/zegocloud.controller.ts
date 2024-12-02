// src/zegocloud/zegocloud.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { ZegocloudService } from './zegocloud.service';

@Controller('zegocloud')
export class ZegocloudController {
  constructor(private readonly zegocloudService: ZegocloudService) {}

  @Get('generate-token')
  generateToken(
    @Query('appId') appId: string,
    @Query('userId') userId: string,
    @Query('secret') secret: string,
    @Query('effectiveTimeInSeconds') effectiveTimeInSeconds: string,
    @Query('payload') payload?: string,
  ): string {
    const parsedAppId = Number(appId);
    console.log('Received appId:', parsedAppId);
    const parsedEffectiveTimeInSeconds = Number(effectiveTimeInSeconds);

    return this.zegocloudService.generateToken04(
      parsedAppId,
      userId,
      secret,
      parsedEffectiveTimeInSeconds,
      payload,
    );
  }
}
