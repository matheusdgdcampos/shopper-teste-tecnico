import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
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
}
