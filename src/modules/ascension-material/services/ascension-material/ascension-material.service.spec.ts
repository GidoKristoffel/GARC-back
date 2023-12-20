import { Test, TestingModule } from '@nestjs/testing';
import { AscensionMaterialService } from './ascension-material.service';

describe('AscensionMaterialService', () => {
  let service: AscensionMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AscensionMaterialService],
    }).compile();

    service = module.get<AscensionMaterialService>(AscensionMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
