import { Module } from '@nestjs/common';
import { ChirpService } from './chirp.service';
import { ChirpController } from './chirp.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChirpService],
  controllers: [ChirpController],
})
export class ChirpModule {}
