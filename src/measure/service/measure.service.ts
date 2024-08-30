import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GenerativeAI } from '@/commons/services/generative-ai';
import { MeasureCreateDto } from '../dto/create-measure.dto';
import { GenerativeMeasureValueException } from '@/errors/generative-measure-value.error';
import { MeasurementResponseDto } from '../dto/measure-create-response.dto';
import { MeasureRepository } from '../repository/measurement';
import { ValidationError } from 'class-validator';

@Injectable()
export class MeasureService {
  protected logger = new Logger(MeasureService.name);

  constructor(
    protected measurementRepository: MeasureRepository,
    protected generativeAI: GenerativeAI,
  ) {}

  async create(measureDto: MeasureCreateDto): Promise<MeasurementResponseDto> {
    try {
      const prompt =
        'Given the image, return the measurement value in the following JSON Schema:{"type": "object","properties": {"measure_value": {"type": "number"}}}';
      const generativeAiResponse =
        await this.generativeAI.generateJSONMeasureValueByBase64Image(
          prompt,
          measureDto.image,
        );

      if (!generativeAiResponse.measure_value) {
        throw new GenerativeMeasureValueException();
      }

      const newMeasurement = await this.measurementRepository.create(
        measureDto,
        generativeAiResponse.measure_value,
      );

      return {
        image_url: newMeasurement.image_url,
        measure_uuir: newMeasurement.measure_uuid,
        measure_value: generativeAiResponse.measure_value,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ValidationError) {
        throw new BadRequestException({
          error_code: 'INVALID_DATA',
          error_description: error.constraints,
        });
      }

      throw error;
    }
  }
}
