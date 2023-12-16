import { Module } from '@nestjs/common';
import { TransformTalentMaterialService } from './services/transform-talent-material/transform-talent-material.service';
import { TalentMaterialService } from './services/talent-material/talent-material.service';
import { TalentMaterialController } from './controllers/talent-material/talent-material.controller';

@Module({
  providers: [TransformTalentMaterialService, TalentMaterialService],
  controllers: [TalentMaterialController]
})
export class TalentMaterialModule {}
