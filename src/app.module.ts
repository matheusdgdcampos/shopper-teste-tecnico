import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  EnvironmentVariables,
  validate,
} from './config/environment-validation';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasureModule } from './measure/measure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        uri: configService.getOrThrow('MONGO_URI', {
          infer: true,
        }),
      }),
      inject: [ConfigService],
    }),
    MeasureModule,
  ],
})
export class AppModule {}
