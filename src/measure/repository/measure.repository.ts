import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Measure, MEASURE_TYPE } from '../entity/measure';
import { InjectModel } from '@nestjs/mongoose';
import { MeasureCreateDto } from '../dto/measure-create.dto';
import { randomUUID } from 'node:crypto';
import { endOfDay, startOfDay } from 'date-fns';

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
        $and: [
          {
            created_at: {
              $gte: startOfDay(measure_datetime),
              $lte: endOfDay(measure_datetime),
            },
          },
          { measure_type: { $eq: type } },
        ],
      })
      .exec();
    return measure;
  }

  async findByUUID(measure_uuid: string) {
    const measure = await this.measureModel.findOne({ measure_uuid }).exec();
    return measure;
  }

  async confirm(measure_uuid: string, confirmed_value: number) {
    const measure = await this.measureModel.findOne({ measure_uuid }).exec();
    measure.measure_value = confirmed_value;
    measure.has_confirmed = true;
    await measure.save();
  }

  async findByCustomerCode(customer_code: string, measure_type?: string) {
    if (measure_type) {
      const measures = await this.measureModel.find({
        customer_code,
        measure_type: new RegExp(measure_type, 'i'),
      });
      return measures;
    }

    const measures = await this.measureModel.find({
      customer_code,
    });
    return measures;
  }
}
