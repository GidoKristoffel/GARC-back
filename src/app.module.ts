import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { CoreModule } from './core/core.module';
import { SuperUserService } from './core/services/super-user/super-user.service';
import { CharacterModule } from './modules/character/character.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register(),
    CoreModule,
    CharacterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SuperUserService,
  ],
})
export class AppModule {}
