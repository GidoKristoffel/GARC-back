import { HttpStatus } from '@nestjs/common';
import { IDeletedEliteBoss, IEliteBoss } from "./common.interface";
import { IDeletedCharacter } from "../../character/interfaces/common.interface";

export interface IAllEliteBossesResponse {
  eliteBosses: IEliteBoss[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IEliteBossResponse {
  eliteBoss: IEliteBoss;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedEliteBossResponse {
  eliteBoss: IEliteBoss;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedEliteBossResponse {
  eliteBoss: IEliteBoss;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedEliteBossResponse {
  eliteBoss: IDeletedEliteBoss | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
