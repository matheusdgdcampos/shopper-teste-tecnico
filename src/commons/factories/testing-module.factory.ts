import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function TestingModuleFactory(): Promise<
  [moduleRef: TestingModule, mongod: MongoMemoryServer]
> {
  const logger = new Logger(TestingModuleFactory.name);
  try {
    const mongod = await MongoMemoryServer.create();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(MongooseModule)
      .useModule(
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongod.getUri(),
          }),
        }),
      )
      .compile();

    return [moduleRef, mongod];
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
