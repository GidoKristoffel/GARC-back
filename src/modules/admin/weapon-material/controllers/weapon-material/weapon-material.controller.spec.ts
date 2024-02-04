import { Test, TestingModule } from '@nestjs/testing';
import { WeaponMaterialController } from './weapon-material.controller';

describe('WeaponMaterialController', () => {
  let controller: WeaponMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponMaterialController],
    }).compile();

    controller = module.get<WeaponMaterialController>(WeaponMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
