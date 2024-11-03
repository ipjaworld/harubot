// api/src/schedule/schedule.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, user: User) {
    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      user,
    });
    return await this.scheduleRepository.save(schedule);
  }

  async findAllByUser(user: User) {
    return await this.scheduleRepository.find({
      where: { user: { id: user.id } },
      order: { startDate: 'ASC' },
    });
  }
}