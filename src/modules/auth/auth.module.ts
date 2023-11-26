import { Module } from '@nestjs/common';
import { UserAuthController } from './controllers/user-auth/user-auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { options } from './config';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { HttpModule } from '@nestjs/axios';
import { BadRequestExceptionService } from './services/bad-request-exception/bad-request-exception.service';
import { TokenService } from './services/token/token.service';

@Module({
  controllers: [UserAuthController],
  providers: [
    AuthService,
    ...STRATEGIES,
    ...GUARDS,
    BadRequestExceptionService,
    TokenService,
  ],
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UserModule,
    HttpModule,
  ],
})
export class AuthModule {}
