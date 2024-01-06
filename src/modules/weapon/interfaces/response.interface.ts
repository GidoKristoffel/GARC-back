import { HttpStatus } from '@nestjs/common';
import { IDeletedWeapon, IWeapon } from './common.interface';

export interface IAllWeaponsResponse {
  weapons: IWeapon[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IWeaponResponse {
  weapon: IWeapon;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedWeaponResponse {
  weapon: IWeapon;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedWeaponResponse {
  weapon: IWeapon;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedWeaponResponse {
  weapon: IDeletedWeapon | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
