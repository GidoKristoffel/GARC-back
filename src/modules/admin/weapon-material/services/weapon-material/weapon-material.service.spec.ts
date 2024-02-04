import { Test, TestingModule } from '@nestjs/testing';
import { WeaponMaterialService } from './weapon-material.service';

describe('WeaponMaterialService', () => {
  let service: WeaponMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponMaterialService],
    }).compile();

    service = module.get<WeaponMaterialService>(WeaponMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
