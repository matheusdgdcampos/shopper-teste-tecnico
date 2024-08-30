import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Measure } from '../entity/measure';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureCreateDto } from '../dto/create-measure.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MeasureRepository {
  protected logger = new Logger(MeasureRepository.name);

  constructor(
    @InjectModel(Measure.name)
    protected measurementModel: Model<Measure>,
  ) {}

  async create(measurementDto: MeasureCreateDto, measure_value: number) {
    try {
      const model = await this.measurementModel.create({
        image_url: `data:image/jpeg;base64,${measurementDto.image}`,
        customer_code: measurementDto.customer_code,
        measure_datetime: measurementDto.measure_datetime,
        measure_type: measurementDto.measure_type,
        has_confirmed: false,
        measure_uuid: randomUUID(),
        measure_value,
      });
      const measurement = await model.save();
      return measurement;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
