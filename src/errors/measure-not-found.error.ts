import { NotFoundException } from '@nestjs/common';

export class MeasureNotFoundException extends NotFoundException {
  constructor() {
    super({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada',
    });
  }
}
