import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

  constructor(private readonly usersService: RolesService) {}


  @Get('/')
  async getRoles() {
    return await this.usersService.getRoles();
  }

}
