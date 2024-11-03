// api/src/schedule/dto/create-schedule.dto.ts
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}