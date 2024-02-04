import { Test, TestingModule } from '@nestjs/testing';
import { TransformWeaponService } from './transform-weapon.service';

describe('TransformWeaponService', () => {
  let service: TransformWeaponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformWeaponService],
    }).compile();

    service = module.get<TransformWeaponService>(TransformWeaponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
