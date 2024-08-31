import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

export enum MEASURE_TYPE {
  WATER = 'WATER',
  GAS = 'GAS',
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Measure {
  @Prop()
  measure_uuid: string;

  @Prop()
  image_url: string;

  @Prop()
  measure_value: number;

  @Prop()
  customer_code: string;

  @Prop()
  has_confirmed: boolean;

  @Prop()
  measure_datetime: Date;

  @Prop({ enum: MEASURE_TYPE })
  measure_type: MEASURE_TYPE;

  @Prop({ default: now() })
  created_at: Date;

  @Prop({ default: now() })
  updated_at: Date;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measure);
