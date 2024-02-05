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
import { AdminAuthController } from './controllers/admin-auth/admin-auth.controller';
import { SuperUserService } from '../../../core/services/super-user/super-user.service';

@Module({
  controllers: [UserAuthController, AdminAuthController],
  providers: [
    AuthService,
    ...STRATEGIES,
    ...GUARDS,
    BadRequestExceptionService,
    TokenService,
    SuperUserService,
  ],
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UserModule,
    HttpModule,
  ],
})
export class AuthModule {}
