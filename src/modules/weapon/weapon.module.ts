import { Module } from '@nestjs/common';
import { TransformWeaponService } from './services/transform-weapon/transform-weapon.service';
import { WeaponService } from './services/weapon/weapon.service';
import { WeaponController } from './controllers/weapon/weapon.controller';

@Module({
  providers: [TransformWeaponService, WeaponService],
  controllers: [WeaponController]
})
export class WeaponModule {}
