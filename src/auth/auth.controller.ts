import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@auth/dto';

@Controller('auth')
export class AuthController {
  @Post('registration')
  registration(@Body() dto: RegisterDto) {}

  @Post('login')
  login(@Body() dto: LoginDto) {}

  @Get('refresh')
  refreshTokens() {}
}
