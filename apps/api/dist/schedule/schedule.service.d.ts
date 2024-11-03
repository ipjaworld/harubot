import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from '../user/entities/user.entity';
export declare class ScheduleService {
    private scheduleRepository;
    constructor(scheduleRepository: Repository<Schedule>);
    create(createScheduleDto: CreateScheduleDto, user: User): Promise<Schedule>;
    findAllByUser(user: User): Promise<Schedule[]>;
}
