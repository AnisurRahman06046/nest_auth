import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/users.dto';

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
}
