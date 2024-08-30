import { BadRequestException } from '@nestjs/common';

export class InvalidMimeTypeError extends BadRequestException {
  constructor() {
    super({
      error_code: 'INVALID_DATA',
      error_description: 'mimeType inválido',
    });
  }
}
