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
import { MobModule } from './modules/mob/mob.module';
import { EliteBossModule } from './modules/elite-boss/elite-boss.module';
import { WeeklyBossModule } from './modules/weekly-boss/weekly-boss.module';
import { TalentMaterialModule } from './modules/talent-material/talent-material.module';
import { AscensionMaterialModule } from './modules/ascension-material/ascension-material.module';
import { LevelUpMaterialModule } from './modules/level-up-material/level-up-material.module';
import { WeaponMaterialModule } from './modules/weapon-material/weapon-material.module';
import { EnhancementMaterialModule } from './modules/enhancement-material/enhancement-material.module';
import { WeaponModule } from './modules/weapon/weapon.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register(),
    CoreModule,
    CharacterModule,
    MobModule,
    EliteBossModule,
    WeeklyBossModule,
    TalentMaterialModule,
    AscensionMaterialModule,
    LevelUpMaterialModule,
    WeaponMaterialModule,
    EnhancementMaterialModule,
    WeaponModule,
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
