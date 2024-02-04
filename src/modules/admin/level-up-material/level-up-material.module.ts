import { Module } from '@nestjs/common';
import { LevelUpMaterialService } from './services/level-up-material/level-up-material.service';
import { TransformLevelUpMaterialService } from './services/transform-level-up-material/transform-level-up-material.service';
import { LevelUpMaterialController } from './controllers/level-up-material/level-up-material.controller';

@Module({
  providers: [LevelUpMaterialService, TransformLevelUpMaterialService],
  controllers: [LevelUpMaterialController]
})
export class LevelUpMaterialModule {}
