import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CharacterService } from '../../services/character/character.service';
import { Character } from '@prisma/client';
import { ICharacterResponse } from '../../interfaces/response.interface';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneCharacter(@Param('id') id: string): Promise<ICharacterResponse> {
    const character: Character | null = await this.characterService.findOne(id);
    return {
      character,
      status: character ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }
}
