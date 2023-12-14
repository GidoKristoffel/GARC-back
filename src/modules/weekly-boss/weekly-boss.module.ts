import { Module } from '@nestjs/common';
import { WeeklyBossService } from './services/weekly-boss/weekly-boss.service';
import { TransformEliteBossService } from './services/transform-elite-boss/transform-elite-boss.service';

@Module({
  providers: [WeeklyBossService, TransformEliteBossService]
})
export class WeeklyBossModule {}
