import { HttpStatus } from '@nestjs/common';
import {
  IAvailableCharacter,
  IDeletedAvailableCharacters,
} from './common.interface';

export interface IAvailableCharactersResponse {
  availableCharacters: IAvailableCharacter[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedAvailableCharactersResponse {
  availableCharacters: IAvailableCharacter[];
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedAvailableCharactersResponse {
  availableCharacters: IAvailableCharacter[];
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedAvailableCharactersResponse {
  availableCharacters: IDeletedAvailableCharacters | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
