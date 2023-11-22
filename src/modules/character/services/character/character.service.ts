import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Character } from '@prisma/client';

@Injectable()
export class CharacterService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(id: string): Promise<Character | null> {
    return this.prismaService.character.findFirst({
      where: {
        id,
      },
    });
  }
}
