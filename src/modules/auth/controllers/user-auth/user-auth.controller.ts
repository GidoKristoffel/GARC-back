import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../dto';
import { AuthService } from '../../services/auth/auth.service';
import { Tokens } from '../../interfaces/auth.interface';
import { Request, Response } from 'express';
import {
  Cookies,
  Public,
  RegistrationDecryptedBody,
  UserAgent,
} from '@common/decorators';
import { UserResponse } from '../../../user/responses';
import { GoogleGuard } from '../../guards/google.guard';
import { HttpService } from '@nestjs/axios';
import { map, mergeMap } from 'rxjs';
import { handleTimeoutAndErrors } from '@common/helpers';
import { Provider, Role, User } from '@prisma/client';
import { BadRequestExceptionService } from '../../services/bad-request-exception/bad-request-exception.service';
import { TokenService } from '../../services/token/token.service';

const REFRESH_TOKEN: string = 'refresh_token';

@Public()
@Controller('user/auth')
export class UserAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly badRequestExceptionService: BadRequestExceptionService,
    private readonly tokenService: TokenService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registration')
  async registration(
    @RegistrationDecryptedBody() dto: RegisterDto,
  ): Promise<UserResponse> {
    const user: User = await this.authService.register(dto, Role.USER);
    this.badRequestExceptionService.registrationException(user, dto);
    return new UserResponse(user);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ): Promise<void> {
    const tokens: Tokens = await this.authService.login(dto, Role.USER, agent);
    this.badRequestExceptionService.loginException(tokens, dto);
    this.tokenService.setRefreshTokenToCookies(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.tokenService.deleteRefreshToken(refreshToken, res);
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK });
  }

  @Get('refresh')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ): Promise<void> {
    this.badRequestExceptionService.refreshException(refreshToken);
    const tokens: Tokens = await this.authService.refreshTokens(
      refreshToken,
      Role.USER,
      agent,
    );
    this.badRequestExceptionService.refreshTokensException(tokens);
    this.tokenService.setRefreshTokenToCookies(tokens, res);
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = req.user['accessToken'];
    return res.redirect(
      `http://localhost:3000/api/auth/success?token=${token}`,
    );
  }

  @Get('success')
  success(
    @Query('token') token: string,
    @UserAgent() agent: string,
    @Res() res: Response,
  ) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .pipe(
        mergeMap(({ data: { email } }) =>
          this.authService.providerAuth(
            email,
            Role.USER,
            agent,
            Provider.GOOGLE,
          ),
        ),
        map((data: Tokens) =>
          this.tokenService.setRefreshTokenToCookies(data, res),
        ),
        handleTimeoutAndErrors(),
      );
  }
}
