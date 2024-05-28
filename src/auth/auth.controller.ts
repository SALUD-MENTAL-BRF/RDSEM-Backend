import { AuthGuard } from './auth.guard';
import { Controller, Body, HttpCode, HttpStatus, Post, Get, UseGuards, Request, HttpException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post("/register")
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("/login")
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  @Post('/google')
  async googleLogin(@Body() body: { tokenId: string }) {
    try {
      const { tokenId } = body;
      if (typeof tokenId !== 'string') {
        throw new HttpException('Invalid tokenId', HttpStatus.BAD_REQUEST);
      }
      const data = await this.authService.googleLogin(tokenId);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}