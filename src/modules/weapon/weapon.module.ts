import { Module } from '@nestjs/common';
import { TransformWeaponService } from './services/transform-weapon/transform-weapon.service';
import { WeaponService } from './services/weapon/weapon.service';

@Module({
  providers: [TransformWeaponService, WeaponService]
})
export class WeaponModule {}
