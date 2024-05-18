import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { jwtConstants } from './constants/jwt.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register({ password, email, username }: RegisterDto) {
    let user = await this.usersService.findOneByEmail(email);
  
    if (user) {
      throw new Error('Email already exists');
    }

    let userfound = await this.usersService.findOneByUsername(username);

    if (userfound) {
      throw new BadRequestException('Username ya registrado');
    }
  
    const hashedPassword = await bcryptjs.hash(password, 10);
  
    user = await this.usersService.CreateUser({
      username,
      email,
      password: hashedPassword,
    });
  
    const payload = { email: user.email, password: hashedPassword };
  
    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret
    });
  
    const data = {
      token: token,
      user: user
    }

    return data;
  }
  
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret
    });

    const data = {
      token,
      user
    }

    return data
  }
}
