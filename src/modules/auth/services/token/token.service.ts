import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { Tokens } from '../../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

const REFRESH_TOKEN: string = 'refresh_token';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async deleteRefreshToken(
    refreshToken: string,
    res: Response,
  ): Promise<void> {
    if (refreshToken) {
      this.prismaService.token
        .delete({ where: { token: refreshToken } })
        .then((): void => {
          res.clearCookie(REFRESH_TOKEN, { httpOnly: true, secure: true });
        });
    }
  }

  public setRefreshTokenToCookies(tokens: Tokens, res: Response): void {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });

    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
