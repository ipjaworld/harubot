import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
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
      relations: ['user'],
    });
  }

  // 추가된 메서드들
  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    
    if (!schedule) {
      throw new NotFoundException(`Schedule #${id} not found`);
    }
    
    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.scheduleRepository.update(id, updateScheduleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const schedule = await this.findOne(id);
    if (schedule) {
      await this.scheduleRepository.remove(schedule);
      return { deleted: true };
    }
    return { deleted: false };
  }
}