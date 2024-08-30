import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MeasureCreateDto } from '../dto/create-measure.dto';
import { MeasureService } from '../service/measure.service';

@Controller()
export class MeasureController {
  constructor(protected measureService: MeasureService) {}

  @HttpCode(200)
  @Post('/upload')
  async uploadMeasure(@Body() measureDto: MeasureCreateDto) {
    const measure = await this.measureService.create(measureDto);
    return measure;
  }
}
