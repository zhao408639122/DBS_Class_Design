import { Module } from '@nestjs/common';
import { RepusController } from './repus.controller';
import { RepusService } from './repus.service';

@Module({
  controllers: [RepusController],
  providers: [RepusService]
})
export class RepusModule {}
