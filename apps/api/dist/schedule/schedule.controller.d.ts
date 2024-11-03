import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from 'src/user/entities/user.entity';
export declare class ScheduleController {
    private readonly scheduleService;
    constructor(scheduleService: ScheduleService);
    create(createScheduleDto: CreateScheduleDto, req: Request & {
        user: User;
    }): Promise<import("./entities/schedule.entity").Schedule>;
    findAll(req: Request & {
        user: User;
    }): Promise<import("./entities/schedule.entity").Schedule[]>;
}
