import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/users-proto';

export const USERS_PACKAGE = 'USERS_PACKAGE';

@Injectable()
export class UsersClientService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USERS_PACKAGE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  getFilteredUsers(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userService.getFilteredUsers({}).subscribe({
        next: (res) => resolve(res.users ?? []),
        error: (err) => reject(err),
      });
    });
  }
}
