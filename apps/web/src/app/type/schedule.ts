export interface Schedule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface CreateScheduleDto {
  title: string;
  startDate: string;
  endDate: string;
}
