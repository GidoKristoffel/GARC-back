import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { IAvailableCharacter } from '../../interfaces/common.interface';
import { AvailableCharactersService } from '../../services/available-characters/available-characters.service';

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
  async updateAvailableCharacters(): Promise<void> {
		// return this.availableCharactersService.update()
  }
}
