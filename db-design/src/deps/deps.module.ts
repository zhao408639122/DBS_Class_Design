import { Module } from '@nestjs/common';
import { DepsController } from './deps.controller';
import { DepsService } from './deps.service';

@Module({
  controllers: [DepsController],
  providers: [DepsService]
})
export class DepsModule {}
