import { HttpStatus } from '@nestjs/common';
import { IDeletedWeeklyBoss, IWeeklyBoss } from './common.interface';

export interface IAllWeeklyBossesResponse {
  weeklyBosses: IWeeklyBoss[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IWeeklyBossResponse {
  weeklyBoss: IWeeklyBoss;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedWeeklyBossResponse {
  weeklyBoss: IWeeklyBoss;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedWeeklyBossResponse {
  weeklyBoss: IWeeklyBoss;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedWeeklyBossResponse {
  weeklyBoss: IDeletedWeeklyBoss | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
