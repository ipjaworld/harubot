import { User } from '../../user/entities/user.entity';
export declare class Schedule {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    user: User;
}
