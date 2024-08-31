import { GenerativeAI } from '@/commons/services/generative-ai';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Measure, MeasurementSchema } from './entity/measure';
import { MeasureRepository } from './repository/measure.repository';
import { MeasureService } from './service/measure.service';
import { MeasureController } from './controller/measure.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Measure.name, schema: MeasurementSchema },
    ]),
  ],
  controllers: [MeasureController],
  providers: [GenerativeAI, MeasureRepository, MeasureService],
  exports: [MeasureService],
})
export class MeasureModule {}
