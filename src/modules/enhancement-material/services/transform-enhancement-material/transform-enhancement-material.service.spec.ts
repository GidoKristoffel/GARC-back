import { Test, TestingModule } from '@nestjs/testing';
import { TransformEnhancementMaterialService } from './transform-enhancement-material.service';

describe('TransformEnhancementMaterialService', () => {
  let service: TransformEnhancementMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformEnhancementMaterialService],
    }).compile();

    service = module.get<TransformEnhancementMaterialService>(TransformEnhancementMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
