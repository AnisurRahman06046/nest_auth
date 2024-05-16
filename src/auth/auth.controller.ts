import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/users.dto';
import { AuthGuard } from './auth.guard';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async registerUser(@Body() payload: UserDto) {
    const result = await this.authService.register(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'user is created',
      data: result,
    };
  }
  @Post('login')
  async login(@Body() payload: { email: string; password: string }) {
    const result = await this.authService.login(payload);
    return {
      status: HttpStatus.OK,
      message: 'user is logged in',
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get('all')
  async users() {
    const result = await this.authService.allUsers();
    return {
      status: HttpStatus.OK,
      message: 'all users',
      data: result,
    };
  }
}
