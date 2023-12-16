import { HttpStatus } from '@nestjs/common';
import { IDeletedTalentMaterial, ITalentMaterial } from './common.interface';

export interface IAllTalentMaterialsResponse {
  talentMaterials: ITalentMaterial[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ITalentMaterialResponse {
  talentMaterial: ITalentMaterial;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedTalentMaterialResponse {
  talentMaterial: ITalentMaterial;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedTalentMaterialResponse {
  talentMaterial: ITalentMaterial;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedTalentMaterialResponse {
  talentMaterial: IDeletedTalentMaterial | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
