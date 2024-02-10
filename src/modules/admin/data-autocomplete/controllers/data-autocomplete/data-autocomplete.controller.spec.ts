import { Test, TestingModule } from '@nestjs/testing';
import { DataAutocompleteController } from './data-autocomplete.controller';

describe('DataAutocompleteController', () => {
  let controller: DataAutocompleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAutocompleteController],
    }).compile();

    controller = module.get<DataAutocompleteController>(DataAutocompleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
