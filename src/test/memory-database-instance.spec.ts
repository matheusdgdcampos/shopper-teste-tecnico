import { TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TestingModuleFactory } from '../commons/testing-module.factory';

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
