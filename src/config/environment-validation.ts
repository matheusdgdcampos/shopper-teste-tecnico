import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum ENVIRONMENT {
  TEST = 'test',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export class EnvironmentVariables {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT = 3000;

  @IsString()
  GEMINI_API_KEY: string;

  @IsString()
  MONGO_URI: string;

  @IsEnum(ENVIRONMENT)
  NODE_ENV: ENVIRONMENT = ENVIRONMENT.DEVELOPMENT;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
