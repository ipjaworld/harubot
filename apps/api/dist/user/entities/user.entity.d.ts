import { Schedule } from '../../schedule/entities/schedule.entity';
export declare class User {
    id: number;
    email: string;
    schedules: Schedule[];
}
