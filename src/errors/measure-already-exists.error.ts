import { ConflictException } from '@nestjs/common';

export class MeasureAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mês já realizada',
    });
  }
}
