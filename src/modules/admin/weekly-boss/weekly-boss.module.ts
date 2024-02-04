import { Module } from '@nestjs/common';
import { WeeklyBossService } from './services/weekly-boss/weekly-boss.service';
import { TransformWeeklyBossService } from './services/transform-weekly-boss/transform-weekly-boss/transform-weekly-boss.service';
import { WeeklyBossController } from './controllers/weekly-boss/weekly-boss.controller';

@Module({
  providers: [WeeklyBossService, TransformWeeklyBossService],
  controllers: [WeeklyBossController],
})
export class WeeklyBossModule {}
