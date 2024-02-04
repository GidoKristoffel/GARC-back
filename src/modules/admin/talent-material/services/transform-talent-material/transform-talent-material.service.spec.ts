import { Test, TestingModule } from '@nestjs/testing';
import { TransformTalentMaterialService } from './transform-talent-material.service';

describe('TransformTalentMaterialService', () => {
  let service: TransformTalentMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformTalentMaterialService],
    }).compile();

    service = module.get<TransformTalentMaterialService>(TransformTalentMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
