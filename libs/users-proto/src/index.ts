import { join } from 'path';

export * from './generated/users.pb';

export const USERS_PROTO_PATH = join(process.cwd(), 'proto', 'users.proto');
