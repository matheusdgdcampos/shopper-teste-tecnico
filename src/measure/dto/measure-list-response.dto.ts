type TMeasureList = {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
};

export class MeasureListResponseDto {
  customer_code: string;
  measures: TMeasureList[];
}
