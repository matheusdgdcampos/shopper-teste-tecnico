import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Measure, MEASURE_TYPE } from '../entity/measure';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureCreateDto } from '../dto/measure-create.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class MeasureRepository {
  protected logger = new Logger(MeasureRepository.name);

  constructor(
    @InjectModel(Measure.name)
    protected measureModel: Model<Measure>,
  ) {}

  async create(measurementDto: MeasureCreateDto, measure_value: number) {
    try {
      const model = await this.measureModel.create({
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

  async findMeasureByDatetimeAndType(
    measure_datetime: string,
    type: MEASURE_TYPE,
  ) {
    const measure = await this.measureModel
      .find({
        created_at: { $gte: measure_datetime, $lte: measure_datetime },
        measure_type: type,
      })
      .exec();
    return measure;
  }

  async findMeasureByUuid(measure_uuid: string) {
    const measure = await this.measureModel.findOne({ measure_uuid }).exec();
    return measure;
  }

  async confirmMeasure(measure_uuid: string, confirmed_value: number) {
    const measure = await this.measureModel.findOne({ measure_uuid }).exec();
    measure.measure_value = confirmed_value;
    measure.has_confirmed = true;
    await measure.save();
  }
}
