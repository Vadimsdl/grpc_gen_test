import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, USERS_PROTO_PATH } from '@app/users-proto';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const url = process.env.GRPC_URL ?? '0.0.0.0:50051';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProducerModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USERS_PACKAGE_NAME,
        protoPath: USERS_PROTO_PATH,
        url,
        loader: { arrays: true },
      },
    },
  );

  await app.listen();
  Logger.log(`gRPC producer listening on ${url}`, 'Producer');
}

bootstrap();
