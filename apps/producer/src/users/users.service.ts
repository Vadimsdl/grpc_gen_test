import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

const MIN_AGE = 18;

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  getFilteredUsers(): string[] {
    const users = this.repo.findAll();
    const result: string[] = [];
    for (const u of users) {
      if (typeof u.age !== 'number') continue;
      if (u.age > MIN_AGE) {
        result.push(`${u.name} (${u.age})`);
      }
    }
    return result;
  }
}
