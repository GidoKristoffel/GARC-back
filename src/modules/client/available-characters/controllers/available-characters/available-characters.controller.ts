import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  IFullAvailableCharacter,
  IFullAvailableCharacterResponse,
} from '../../interfaces/common.interface';
import { AvailableCharactersService } from '../../services/available-characters/available-characters.service';
import { AvailableCharactersDto } from '../../dto';
import { CurrentUser } from '@common/decorators';
import { User } from '@prisma/client';

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
  @Post()
  async updateAvailableCharacters(
    @CurrentUser() user: User,
    @Body() dto: AvailableCharactersDto,
  ): Promise<IFullAvailableCharacterResponse> {
    console.log(user.id);
    console.log(dto);
    const availableCharacters: IFullAvailableCharacter[] | null =
      await this.availableCharactersService.update(
        user.id,
        dto.charactersToAdd,
        dto.charactersToRemove,
      );
    return {
      availableCharacters,
      status: availableCharacters ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }
}
