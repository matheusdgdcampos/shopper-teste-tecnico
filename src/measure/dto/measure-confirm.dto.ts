import { IsNumber, IsUUID } from 'class-validator';

export class MeasureConfirmDto {
  @IsUUID('4', { message: 'O campo measure_uuid deve ser no formato UUIDV4' })
  measure_uuid: string;

  @IsNumber(
    { allowNaN: false },
    { message: 'O campo confirmed_value deve ser um número' },
  )
  confirmed_value: number;
}
