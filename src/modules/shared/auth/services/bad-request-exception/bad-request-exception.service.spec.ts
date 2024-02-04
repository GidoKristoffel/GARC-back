import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestExceptionService } from './bad-request-exception.service';

describe('BadRequestExceptionService', () => {
  let service: BadRequestExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadRequestExceptionService],
    }).compile();

    service = module.get<BadRequestExceptionService>(BadRequestExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
