import { Test, TestingModule } from '@nestjs/testing';
import { CharacterAutocompleteService } from './character-autocomplete.service';

describe('CharacterAutocompleteService', () => {
  let service: CharacterAutocompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterAutocompleteService],
    }).compile();

    service = module.get<CharacterAutocompleteService>(CharacterAutocompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
