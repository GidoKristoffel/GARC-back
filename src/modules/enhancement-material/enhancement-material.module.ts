import { Module } from '@nestjs/common';
import { EnhancementMaterialService } from './services/enhancement-material/enhancement-material.service';
import { TransformEnhancementMaterialService } from './services/transform-enhancement-material/transform-enhancement-material.service';
import { EnhancementMaterialController } from './controllers/enhancement-material/enhancement-material.controller';

@Module({
  providers: [EnhancementMaterialService, TransformEnhancementMaterialService],
  controllers: [EnhancementMaterialController]
})
export class EnhancementMaterialModule {}
