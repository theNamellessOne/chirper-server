import { Module } from '@nestjs/common';
import { ChirpModule } from './chirp/chirp.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ChirpModule, AuthModule, PrismaModule, UserModule],
})
export class AppModule {}
