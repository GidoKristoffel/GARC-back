import { Test, TestingModule } from '@nestjs/testing';
import { TransformCharacterService } from './transform-character.service';

describe('TransformCharacterService', () => {
  let service: TransformCharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformCharacterService],
    }).compile();

    service = module.get<TransformCharacterService>(TransformCharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
