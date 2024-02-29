import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import {
  IAvailableCharacter,
  IFullAvailableCharacter,
  IFullAvailableCharacterResponse,
} from '../../interfaces/common.interface';
import { AvailableCharactersService } from '../../services/available-characters/available-characters.service';
import { AvailableCharactersDto } from '../../dto';

@Controller('client/available-characters')
export class AvailableCharactersController {
  constructor(private availableCharactersService: AvailableCharactersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAvailableCharacters(
    userId: string,
  ): Promise<IFullAvailableCharacterResponse> {
    const availableCharacters: IFullAvailableCharacter[] | null =
      await this.availableCharactersService.getByUserId(userId);
    return {
      availableCharacters,
      status: availableCharacters ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
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
