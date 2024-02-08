import { Test, TestingModule } from '@nestjs/testing';
import { AvailableCharactersService } from './available-characters.service';

describe('AvailableCharactersService', () => {
  let service: AvailableCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableCharactersService],
    }).compile();

    service = module.get<AvailableCharactersService>(AvailableCharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
