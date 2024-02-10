import { Test, TestingModule } from '@nestjs/testing';
import { DataAutocompleteService } from './data-autocomplete.service';

describe('DataAutocompleteService', () => {
  let service: DataAutocompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAutocompleteService],
    }).compile();

    service = module.get<DataAutocompleteService>(DataAutocompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
