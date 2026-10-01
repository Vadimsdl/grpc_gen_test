import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { UsersClientService } from './users-client.service';

const ATTEMPTS = 10;
const RETRY_DELAY_MS = 1000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ConsumerModule, {
    logger: ['error', 'warn'],
  });
  const usersClient = app.get(UsersClientService);

  let users: string[] | undefined;
  let lastError: unknown;

  for (let i = 1; i <= ATTEMPTS; i++) {
    try {
      users = await usersClient.getFilteredUsers();
      break;
    } catch (err) {
      lastError = err;
      console.error(`producer not ready, attempt ${i}/${ATTEMPTS}`);
      await sleep(RETRY_DELAY_MS);
    }
  }

  if (!users) {
    const msg = lastError instanceof Error ? lastError.message : lastError;
    console.error('could not reach producer:', msg);
    await app.close();
    process.exit(1);
  }

  console.log('Filtered Users:', JSON.stringify(users, null, 2));

  await app.close();
}

bootstrap();
