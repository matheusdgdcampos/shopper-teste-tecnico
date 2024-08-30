import { BadRequestException } from '@nestjs/common';

export class GenerativeMeasureValueException extends BadRequestException {
  constructor() {
    super('AI return invalid measure value');
  }
}
