import { Test, TestingModule } from '@nestjs/testing';
import { EnhancementMaterialService } from './enhancement-material.service';

describe('EnhancementMaterialService', () => {
  let service: EnhancementMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnhancementMaterialService],
    }).compile();

    service = module.get<EnhancementMaterialService>(EnhancementMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
