import { Test, TestingModule } from '@nestjs/testing';
import { DepsService } from './deps.service';

describe('DepsService', () => {
  let service: DepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepsService],
    }).compile();

    service = module.get<DepsService>(DepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
