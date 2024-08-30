import { BadRequestException } from '@nestjs/common';

export class AICaptureValueError extends BadRequestException {
  constructor() {
    super({
      error_code: 'INVALID_DATA',
      error_description: 'Erro ao capturar valor da medição',
    });
  }
}
