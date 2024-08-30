import { TestingModuleFactory } from '@/commons/factories/testing-module.factory';
import { TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MemoryDataabseInstance', () => {
  let moduleRef: TestingModule;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    [moduleRef, mongod] = await TestingModuleFactory();
  });

  afterAll(async () => {
    await mongod.stop();
    await moduleRef.close();
  });

  it('Must be able to verify that the in-memory database instance has been instantiated', () => {
    expect(mongod).toBeInstanceOf(MongoMemoryServer);
  });
});
