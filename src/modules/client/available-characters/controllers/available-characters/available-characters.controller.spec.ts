import { Test, TestingModule } from '@nestjs/testing';
import { AvailableCharactersController } from './available-characters.controller';

describe('AvailableCharactersController', () => {
  let controller: AvailableCharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableCharactersController],
    }).compile();

    controller = module.get<AvailableCharactersController>(AvailableCharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
