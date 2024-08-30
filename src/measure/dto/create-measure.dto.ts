import { IsBase64, IsDateString, IsEnum, IsString } from 'class-validator';
import { MEASURE_TYPE } from '../entity/measure';

export class MeasureCreateDto {
  @IsBase64(
    {},
    { message: 'A imagem fornecida dever estar encodade em base64' },
  )
  image: string;

  @IsString({ message: 'O campo customer_code é obrigatório' })
  customer_code: string;

  @IsDateString(
    {},
    {
      message: 'O campo measure_datetime deve estar no formato datetime',
    },
  )
  measure_datetime: Date;

  @IsEnum(MEASURE_TYPE, {
    message: "O campo measure type deve informar como 'WATER' ou 'GAS'",
  })
  measure_type: MEASURE_TYPE;
}
