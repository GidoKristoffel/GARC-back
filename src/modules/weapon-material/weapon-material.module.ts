import { Module } from '@nestjs/common';
import { WeaponMaterialService } from './services/weapon-material/weapon-material.service';
import { TransformWeaponMaterialService } from './services/transform-weapon-material/transform-weapon-material.service';
import { WeaponMaterialController } from './controllers/weapon-material/weapon-material.controller';

@Module({
  providers: [WeaponMaterialService, TransformWeaponMaterialService],
  controllers: [WeaponMaterialController]
})
export class WeaponMaterialModule {}
