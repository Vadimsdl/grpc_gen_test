import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, USERS_PROTO_PATH } from '@app/users-proto';
import { USERS_PACKAGE, UsersClientService } from './users-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: USERS_PACKAGE_NAME,
          protoPath: USERS_PROTO_PATH,
          url: process.env.PRODUCER_URL ?? 'localhost:50051',
          loader: { arrays: true },
        },
      },
    ]),
  ],
  providers: [UsersClientService],
})
export class ConsumerModule {}
