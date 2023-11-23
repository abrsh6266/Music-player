// src/music/music.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('music')
export class MusicController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getAllMusic() {
    return this.prisma.music.findMany();
  }
  @Get('genres')
  async getAllGenres(){
    const distinctGenres = await this.prisma.music.findMany({
      select: {
        genre: true,
      },
      distinct: ['genre'],
    });

    return distinctGenres.map((entry) => entry.genre);
  }
  @Get('byGenre')
  async getMusicByGenre(@Query('genre') genre: string) {
    return this.prisma.music.findMany({
      where: {
        genre: genre,
      },
    });
  }
  @Post()
  async addMusic(@Body() data) {
    return this.prisma.music.create({
      data,
    });
  }

  @Put(':id')
  async updateMusic(@Param('id') id: string, @Body() data) {
    return this.prisma.music.update({
      where: { id: parseInt(id) },
      data,
    });
  }
  @Delete(':id')
  async deleteMusic(@Param('id') id: string) {
    return this.prisma.music.delete({
      where: { id: parseInt(id) },
    });
  }
}
