import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/shared/user/user.module';
import { PrismaModule } from './modules/shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { CoreModule } from './core/core.module';
import { SuperUserService } from './core/services/super-user/super-user.service';
import { EliteBossModule } from './modules/admin/elite-boss/elite-boss.module';
import { TalentMaterialModule } from './modules/admin/talent-material/talent-material.module';
import { AscensionMaterialModule } from './modules/admin/ascension-material/ascension-material.module';
import { LevelUpMaterialModule } from './modules/admin/level-up-material/level-up-material.module';
import { WeaponMaterialModule } from './modules/admin/weapon-material/weapon-material.module';
import { EnhancementMaterialModule } from './modules/admin/enhancement-material/enhancement-material.module';
import { WeaponModule } from './modules/admin/weapon/weapon.module';
import { CharacterModule } from './modules/admin/character/character.module';
import { MobModule } from './modules/admin/mob/mob.module';
import { WeeklyBossModule } from './modules/admin/weekly-boss/weekly-boss.module';
import { AuthModule } from './modules/shared/auth/auth.module';
import { JwtAuthGuard } from './modules/shared/auth/guards/jwt-auth.guard';
import { AvailableCharactersModule } from './modules/client/available-characters/available-characters.module';

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
    AvailableCharactersModule,
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
