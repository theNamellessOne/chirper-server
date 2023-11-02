import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './local.guard';
import { UserService } from '../user/user.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  login(@Req() req: Express.Request) {
    return req.user;
  }

  @Post('/register')
  register(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
