import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from '../../dto';
import { Response } from 'express';
import { Cookies, Public, UserAgent } from '@common/decorators';
import { Tokens } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { BadRequestExceptionService } from '../../services/bad-request-exception/bad-request-exception.service';
import { TokenService } from '../../services/token/token.service';
import { Role } from '@prisma/client';

const REFRESH_TOKEN: string = 'refresh_token';

@Public()
@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly badRequestExceptionService: BadRequestExceptionService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ): Promise<void> {
    const tokens: Tokens = await this.authService.login(dto, Role.ADMIN, agent);
    this.badRequestExceptionService.loginException(tokens, dto);
    this.tokenService.setRefreshTokenToCookies(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.tokenService
      .deleteRefreshToken(refreshToken, res)
      .then((): void => {
        res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
      });
  }

  @Get('refresh')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ): Promise<Response> {
    this.badRequestExceptionService.refreshException(refreshToken);
    const tokens: Tokens = await this.authService.refreshTokens(
      refreshToken,
      Role.ADMIN,
      agent,
    );
    this.badRequestExceptionService.refreshTokensException(tokens);
    return this.tokenService.setRefreshTokenToCookies(tokens, res);
  }
}
