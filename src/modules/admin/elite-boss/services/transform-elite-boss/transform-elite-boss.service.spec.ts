import { Test, TestingModule } from '@nestjs/testing';
import { TransformEliteBossService } from './transform-elite-boss.service';

describe('TransformEliteBossService', () => {
  let service: TransformEliteBossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformEliteBossService],
    }).compile();

    service = module.get<TransformEliteBossService>(TransformEliteBossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
