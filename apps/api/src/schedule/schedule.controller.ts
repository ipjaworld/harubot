// api/src/schedule/schedule.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('schedules')
@UseGuards(JwtAuthGuard)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Request() req: Request & { user: User }
  ) {
    return this.scheduleService.create(createScheduleDto, req.user);
  }

  @Get()
  findAll(@Request() req: Request & { user: User }) {
    return this.scheduleService.findAllByUser(req.user);
  }
}
