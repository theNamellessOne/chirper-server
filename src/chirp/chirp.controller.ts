import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ChirpService } from './chirp.service';
import { ChirpDto } from './dto/chirp.dto';
import { LocalGuard } from '../auth/local.guard';

@Controller('chirp')
export class ChirpController {
  constructor(private chirpService: ChirpService) {}

  @Put()
  @UseGuards(LocalGuard)
  create(@Body() reqBody: any, @Req() req: Express.Request) {
    const chirpDto: ChirpDto = {
      authorId: req.user['id'],
      content: reqBody.content,
    };
    return this.chirpService.create(chirpDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.chirpService.findById(+id);
  }

  @Get('user/:authorid')
  findByAuthorId(@Param('authorid') authorId: number) {
    return this.chirpService.findByAuthorId(+authorId);
  }

  @Get('page/:page')
  findMany(@Param('page') page: string) {
    return this.chirpService.findMany(10, 10 * +page);
  }

  @Delete(':id')
  @UseGuards(LocalGuard)
  async delete(@Param('id') id: string, @Req() req: Express.Request) {
    if (
      (await this.chirpService.findById(+id)).author['id'] === req.user['id']
    ) {
      return this.chirpService.delete(+id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
