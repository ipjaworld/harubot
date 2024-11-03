// api/src/schedule/schedule.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}