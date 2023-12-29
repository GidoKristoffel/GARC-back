import { Test, TestingModule } from '@nestjs/testing';
import { TransformLevelUpMaterialService } from './transform-level-up-material.service';

describe('TransformLevelUpMaterialService', () => {
  let service: TransformLevelUpMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformLevelUpMaterialService],
    }).compile();

    service = module.get<TransformLevelUpMaterialService>(TransformLevelUpMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
