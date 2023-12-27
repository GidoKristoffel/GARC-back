import { Module } from '@nestjs/common';
import { TransformAscensionMaterialService } from './services/transform-ascension-material/transform-ascension-material.service';
import { AscensionMaterialController } from './controllers/ascension-material/ascension-material.controller';
import { AscensionMaterialService } from './services/ascension-material/ascension-material.service';

@Module({
  providers: [AscensionMaterialService, TransformAscensionMaterialService],
  controllers: [AscensionMaterialController],
})
export class AscensionMaterialModule {}
