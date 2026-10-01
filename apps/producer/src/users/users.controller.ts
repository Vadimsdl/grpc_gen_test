import { Controller } from '@nestjs/common';
import {
  GetFilteredUsersResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/users-proto';
import { UsersService } from './users.service';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  getFilteredUsers(): GetFilteredUsersResponse {
    return { users: this.usersService.getFilteredUsers() };
  }
}
