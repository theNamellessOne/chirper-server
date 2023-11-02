import { Injectable } from '@nestjs/common';
import { ChirpDto } from './dto/chirp.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChirpService {
  constructor(private prisma: PrismaService) {}

  create(chirpDto: ChirpDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, author, ...result } = chirpDto;
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
