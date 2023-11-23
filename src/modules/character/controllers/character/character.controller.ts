import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CharacterService } from '../../services/character/character.service';
import { Character, UserCharacters } from '@prisma/client';
import {
  IAllCharactersResponse,
  IAvailableCharacterResponse,
  ICharacterResponse,
  ICreatedCharacterResponse,
  IDeletedCharactersResponse,
  IUpdatedCharacterResponse,
} from '../../interfaces/response.interface';
import { IDeletedCharacter } from '../../interfaces/common.interface';
import { CharacterDto } from '../../dto';
import { AvailableCharactersDto } from '../../dto/available-characters.dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllCharacters(): Promise<IAllCharactersResponse> {
    const character: Character[] | null = await this.characterService.findAll();
    return {
      character,
      status: character ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOneCharacter(@Param('id') id: string): Promise<ICharacterResponse> {
    const character: Character | null = await this.characterService.findOne(id);
    return {
      character,
      status: character ? HttpStatus.FOUND : HttpStatus.NOT_FOUND,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createCharacter(
    @Body() dto: CharacterDto,
  ): Promise<ICreatedCharacterResponse> {
    const character: Character | null = await this.characterService.create(dto);
    return {
      character,
      status: character ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() dto: CharacterDto,
  ): Promise<IUpdatedCharacterResponse> {
    const character: Character | null = await this.characterService.update(
      id,
      dto,
    );
    return {
      character,
      status: character ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('available/:id')
  async updateAvailableCharacters(
    @Param('id') id: string,
    @Body() dto: AvailableCharactersDto,
  ): Promise<IAvailableCharacterResponse> {
    const available: UserCharacters[] =
      await this.characterService.updateAvailableCharacters(id, dto);
    return {
      available,
      status: available.length ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async deleteCharacter(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IDeletedCharactersResponse> {
    const character: IDeletedCharacter = await this.characterService.delete(id);
    return {
      character,
      status: character ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
    };
  }
}
