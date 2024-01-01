import { IDeletedWeaponMaterial, IWeaponMaterial } from './common.interface';
import { HttpStatus } from '@nestjs/common';

export interface IAllWeaponMaterialsResponse {
  weaponMaterials: IWeaponMaterial[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IWeaponMaterialResponse {
  weaponMaterial: IWeaponMaterial;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedWeaponMaterialResponse {
  weaponMaterial: IWeaponMaterial;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedWeaponMaterialResponse {
  weaponMaterial: IWeaponMaterial;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedWeaponMaterialResponse {
  weaponMaterial: IDeletedWeaponMaterial | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
