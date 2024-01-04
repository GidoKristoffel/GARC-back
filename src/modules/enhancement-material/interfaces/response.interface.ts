import { HttpStatus } from '@nestjs/common';
import {
  IDeletedEnhancementMaterial,
  IEnhancementMaterial,
} from './common.interface';

export interface IAllEnhancementMaterialsResponse {
  enhancementMaterials: IEnhancementMaterial[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IEnhancementMaterialResponse {
  enhancementMaterial: IEnhancementMaterial;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedEnhancementMaterialResponse {
  enhancementMaterial: IEnhancementMaterial;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedEnhancementMaterialResponse {
  enhancementMaterial: IEnhancementMaterial;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedEnhancementMaterialResponse {
  enhancementMaterial: IDeletedEnhancementMaterial | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
