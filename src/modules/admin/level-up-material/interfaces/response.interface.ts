import { HttpStatus } from '@nestjs/common';
import { IDeletedLevelUpMaterial, ILevelUpMaterial } from './common.interface';

export interface IAllLevelUpMaterialsResponse {
  levelUpMaterials: ILevelUpMaterial[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ILevelUpMaterialResponse {
  levelUpMaterial: ILevelUpMaterial;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedLevelUpMaterialResponse {
  levelUpMaterial: ILevelUpMaterial;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedLevelUpMaterialResponse {
  levelUpMaterial: ILevelUpMaterial;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedLevelUpMaterialResponse {
  levelUpMaterial: IDeletedLevelUpMaterial | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
