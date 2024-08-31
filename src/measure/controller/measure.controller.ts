import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MeasureCreateDto } from '../dto/measure-create.dto';
import { MeasureService } from '../service/measure.service';
import { MeasureConfirmDto } from '../dto/measure-confirm.dto';

@Controller()
export class MeasureController {
  constructor(protected measureService: MeasureService) {}

  @HttpCode(200)
  @Post('/upload')
  async uploadMeasure(@Body() measureDto: MeasureCreateDto) {
    const measure = await this.measureService.create(measureDto);
    return measure;
  }

  @Patch('/confirm')
  async confirmMeasure(@Body() measureConfirmDto: MeasureConfirmDto) {
    const success = await this.measureService.confirmMeasure(measureConfirmDto);
    return success;
  }

  @Get('/:customer_code/list')
  async listMeasuresByCustomerCode(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measure_type: string,
  ) {
    const measures = await this.measureService.listMeasuresByCustomerCode(
      customer_code,
      measure_type,
    );

    return measures;
  }
}
