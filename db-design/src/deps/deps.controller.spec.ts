import { Test, TestingModule } from '@nestjs/testing';
import { DepsController } from './deps.controller';

describe('Deps Controller', () => {
  let controller: DepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepsController],
    }).compile();

    controller = module.get<DepsController>(DepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
