import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } =
      await this.userService.findByUsername(username);
    return user;
  }
}
