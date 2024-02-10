import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { IAvailableCharacter } from '../../interfaces/common.interface';
import { AvailableCharactersService } from '../../services/available-characters/available-characters.service';
import { AvailableCharactersDto } from '../../dto';

@Controller('available-characters')
export class AvailableCharactersController {
  constructor(private availableCharactersService: AvailableCharactersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAvailableCharacters(userId: string): Promise<IAvailableCharacter[]> {
    return this.availableCharactersService.getByUserId(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async updateAvailableCharacters(
    @Body() dto: AvailableCharactersDto,
  ): Promise<void> {
    return await this.availableCharactersService.update(
      dto.userId,
      dto.charactersToAdd,
      dto.charactersToRemove,
    );
  }
}
