import { Test, TestingModule } from '@nestjs/testing';
import { TalentMaterialService } from './talent-material.service';

describe('TalentMaterialService', () => {
  let service: TalentMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentMaterialService],
    }).compile();

    service = module.get<TalentMaterialService>(TalentMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
