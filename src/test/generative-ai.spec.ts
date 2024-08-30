import { AppModule } from '@/app.module';
import { GenerativeAI } from '@/commons/services/generative-ai';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

describe('GenerativeAI', () => {
  let moduleRef: TestingModule;
  let generativeAI: GenerativeAI;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [GenerativeAI],
    }).compile();

    generativeAI = moduleRef.get(GenerativeAI);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('generateJSONContentByImage', () => {
    it('Should be able to generate output of measurement of iven image', async () => {
      const prompt =
        'Given the image, return the measurement value in the following JSON Schema:{"type": "object","properties": {"measure_value": {"type": "number"}}}';
      const base64Image = await fs.readFile(
        path.resolve(
          __dirname,
          '..',
          '..',
          'temp',
          'test-base64-image-content.txt',
        ),
        'utf-8',
      );
      const generatedJsonResponse: any =
        await generativeAI.generateJSONContentByImage(prompt, base64Image);
      expect(generatedJsonResponse).toHaveProperty('measure_value');
    });
  });
});
