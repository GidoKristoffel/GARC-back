import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '@auth/dto';
import { AuthService } from '@auth/auth.service';
import { Tokens } from "@auth/interfaces";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    if (!user) {
      throw new BadRequestException(
        `Can't register user with data ${JSON.stringify(dto)}`,
      );
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    const tokens: Tokens = await this.authService.login(dto);
    if (!tokens) {
      throw new BadRequestException(
        `Can't login with data ${JSON.stringify(dto)}`,
      );
    }
    return { accessToken: tokens.accessToken };
  }

  @Get('refresh')
  refreshTokens() {}
}
