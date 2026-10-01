import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { User } from './user';

@Injectable()
export class UsersRepository {
  private readonly filePath =
    process.env.USERS_FILE ??
    join(process.cwd(), 'apps', 'producer', 'src', 'data', 'users.json');

  findAll(): User[] {
    const raw = readFileSync(this.filePath, 'utf8');
    return JSON.parse(raw);
  }
}
