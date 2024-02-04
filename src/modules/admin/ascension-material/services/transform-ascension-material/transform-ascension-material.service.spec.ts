import { Test, TestingModule } from '@nestjs/testing';
import { TransformAscensionMaterialService } from './transform-ascension-material.service';

describe('TransformAscensionMaterialService', () => {
  let service: TransformAscensionMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformAscensionMaterialService],
    }).compile();

    service = module.get<TransformAscensionMaterialService>(TransformAscensionMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
