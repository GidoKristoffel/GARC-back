import { HttpStatus } from '@nestjs/common';
import {
  IAscensionMaterial,
  IDeletedAscensionMaterial,
} from './common.interface';

export interface IAllAscensionMaterialsResponse {
  ascensionMaterials: IAscensionMaterial[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IAscensionMaterialResponse {
  ascensionMaterial: IAscensionMaterial;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedAscensionMaterialResponse {
  ascensionMaterial: IAscensionMaterial;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedAscensionMaterialResponse {
  ascensionMaterial: IAscensionMaterial;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedAscensionMaterialResponse {
  ascensionMaterial: IDeletedAscensionMaterial | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
