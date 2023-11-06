import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChirpDto } from './dto/chirp.dto';

@Injectable()
export class ChirpService {
  constructor(private prisma: PrismaService) {}

  create(chirpDto: ChirpDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...result } = chirpDto;
    return this.prisma.chirp.create({ data: result });
  }

  findById(id: number) {
    return this.prisma.chirp.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  findByAuthorId(authorId: number) {
    return this.prisma.chirp.findMany({
      where: { authorId },
      include: {
        author: true,
      },
    });
  }

  findMany(take: number, skip: number) {
    return this.prisma.chirp.findMany({ take: take, skip: skip });
  }

  delete(id: number) {
    return this.prisma.chirp.delete({ where: { id } });
  }
}
