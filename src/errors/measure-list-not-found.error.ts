import { NotFoundException } from '@nestjs/common';

export class MeasuresListNotFoundException extends NotFoundException {
  constructor() {
    super({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada',
    });
  }
}
