import { Module } from '@nestjs/common';
import { MobController } from './controllers/mob/mob.controller';
import { MobService } from './services/mob/mob.service';
import { TransformMobService } from './services/transform-mob/transform-mob.service';

@Module({
  controllers: [MobController],
  providers: [MobService, TransformMobService]
})
export class MobModule {}
