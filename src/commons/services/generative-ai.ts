import { EnvironmentVariables } from '@/config/environment-validation';
import { AICaptureValueError } from '@/errors/ai-capture-value.error';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type TGenerativeResponseDto = {
  measure_value?: number;
};

@Injectable()
export class GenerativeAI {
  protected logger = new Logger(GenerativeAI.name);

  protected validMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/heic',
    'image/heif',
  ];

  constructor(protected configService: ConfigService<EnvironmentVariables>) {}

  private getModel() {
    const genAI = new GoogleGenerativeAI(
      this.configService.getOrThrow('GEMINI_API_KEY'),
    );
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    });
    return model;
  }

  private factoryGenerativePart(base64Image: string) {
    return {
      inlineData: {
        data: base64Image,
        mimeType: 'image/jpeg',
      },
    };
  }

  public async generateJSONContentByImage(
    prompt: string,
    base64Image: string,
  ): Promise<TGenerativeResponseDto | undefined> {
    try {
      const model = this.getModel();
      const imagePart = this.factoryGenerativePart(base64Image);
      const generatedContent = await model.generateContent([prompt, imagePart]);
      return JSON.parse(
        generatedContent.response.text(),
      ) as TGenerativeResponseDto;
    } catch (error) {
      this.logger.error(error);
      throw new AICaptureValueError();
    }
  }
}
