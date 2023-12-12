import { IDeletedMob, IMob } from './common.interface';
import { HttpStatus } from '@nestjs/common';

export interface IAllMobsResponse {
  mobs: IMob[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IMobResponse {
  mob: IMob;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedMobResponse {
  mob: IMob;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedMobResponse {
  mob: IMob;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedMobResponse {
  mob: IDeletedMob | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
