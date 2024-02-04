import { Test, TestingModule } from '@nestjs/testing';
import { EliteBossController } from './elite-boss.controller';

describe('EliteBossController', () => {
  let controller: EliteBossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EliteBossController],
    }).compile();

    controller = module.get<EliteBossController>(EliteBossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
