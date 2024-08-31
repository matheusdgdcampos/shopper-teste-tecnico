import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GenerativeAI } from '@/commons/services/generative-ai';
import { MeasureCreateDto } from '../dto/measure-create.dto';
import { GenerativeMeasureValueException } from '@/errors/generative-measure-value.error';
import { MeasurementResponseDto } from '../dto/measure-create-response.dto';
import { MeasureRepository } from '../repository/measure.repository';
import { ValidationError } from 'class-validator';
import { MeasureConfirmDto } from '../dto/measure-confirm.dto';
import { MeasureNotFoundException } from '@/errors/measure-not-found.error';
import { MeasureAlreadyConfirmedException } from '@/errors/measure-already-confirmed.error';

@Injectable()
export class MeasureService {
  protected logger = new Logger(MeasureService.name);

  constructor(
    protected measurementRepository: MeasureRepository,
    protected generativeAI: GenerativeAI,
  ) {}

  async create(measureDto: MeasureCreateDto): Promise<MeasurementResponseDto> {
    try {
      // TODO Need fix this query
      // const measureAlreadyExists =
      //   await this.measurementRepository.findMeasureByDatetimeAndType(
      //     measureDto.measure_datetime.toString(),
      //     measureDto.measure_type,
      //   );

      // console.log('measureAlreadyExists', measureAlreadyExists);

      // if (measureAlreadyExists.length > 0) {
      //   throw new MeasureAlreadyExistsException();
      // }

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

  async confirmMeasure(measureConfirmDto: MeasureConfirmDto) {
    try {
      const measure = await this.measurementRepository.findMeasureByUuid(
        measureConfirmDto.measure_uuid,
      );

      if (!measure) {
        throw new MeasureNotFoundException();
      }

      if (measure.has_confirmed) {
        throw new MeasureAlreadyConfirmedException();
      }

      await this.measurementRepository.confirmMeasure(
        measure.measure_uuid,
        measureConfirmDto.confirmed_value,
      );

      return { success: true };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
