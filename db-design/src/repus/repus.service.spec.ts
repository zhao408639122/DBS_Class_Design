import { Test, TestingModule } from '@nestjs/testing';
import { RepusService } from './repus.service';

describe('RepusService', () => {
  let service: RepusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepusService],
    }).compile();

    service = module.get<RepusService>(RepusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
