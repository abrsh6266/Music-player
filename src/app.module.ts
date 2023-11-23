import { Module } from '@nestjs/common';
import { MusicController } from './music/music.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [MusicController],
  providers: [PrismaService],
})
export class AppModule {}
