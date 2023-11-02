import { Controller, Delete, Get, Param, Put, Req } from '@nestjs/common';
import { ChirpService } from './chirp.service';
import { ChirpDto } from './dto/chirp.dto';

@Controller('chirp')
export class ChirpController {
  constructor(private chirpService: ChirpService) {}

  @Put()
  create(chirpDto: ChirpDto, @Req() req: Express.Request) {
    chirpDto.authorId = req.user['id'];
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
  delete(@Param('id') id: string) {
    return this.chirpService.delete(+id);
  }
}
