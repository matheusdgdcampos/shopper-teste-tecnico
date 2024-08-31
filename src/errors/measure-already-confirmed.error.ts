import { ConflictException } from '@nestjs/common';

export class MeasureAlreadyConfirmedException extends ConflictException {
  constructor() {
    super({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura do mês já realizada',
    });
  }
}
