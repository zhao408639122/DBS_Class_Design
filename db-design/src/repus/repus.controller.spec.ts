import { Test, TestingModule } from '@nestjs/testing';
import { RepusController } from './repus.controller';

describe('Repus Controller', () => {
  let controller: RepusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepusController],
    }).compile();

    controller = module.get<RepusController>(RepusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
