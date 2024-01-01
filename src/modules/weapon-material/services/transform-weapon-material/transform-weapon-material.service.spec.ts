import { Test, TestingModule } from '@nestjs/testing';
import { TransformWeaponMaterialService } from './transform-weapon-material.service';

describe('TransformWeaponMaterialService', () => {
  let service: TransformWeaponMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformWeaponMaterialService],
    }).compile();

    service = module.get<TransformWeaponMaterialService>(TransformWeaponMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
