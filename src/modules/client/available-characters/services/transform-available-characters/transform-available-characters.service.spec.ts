import { Test, TestingModule } from '@nestjs/testing';
import { TransformAvailableCharactersService } from './transform-available-characters.service';

describe('TransformAvailableCharactersService', () => {
  let service: TransformAvailableCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformAvailableCharactersService],
    }).compile();

    service = module.get<TransformAvailableCharactersService>(TransformAvailableCharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
