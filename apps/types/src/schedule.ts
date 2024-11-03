export interface ISchedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface ICreateScheduleDto {
  title: string;
  startDate: string;
  endDate: string;
}
