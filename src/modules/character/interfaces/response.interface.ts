import { HttpStatus } from '@nestjs/common';
import { Character, UserCharacters } from '@prisma/client';
import { ICharacter, IDeletedCharacter } from "./common.interface";

export interface ICharacterResponse {
  character: Character | null;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IAllCharactersResponse {
  character: Character[] | null;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedCharacterResponse {
  character: ICharacter | null;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedCharacterResponse {
  character: Character | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IAvailableCharacterResponse {
  available: UserCharacters[];
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedCharactersResponse {
  character: IDeletedCharacter | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
