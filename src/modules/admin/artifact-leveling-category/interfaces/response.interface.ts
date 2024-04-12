import { HttpStatus } from '@nestjs/common';
import {
  IArtifactLevelingCategory,
  IDeletedArtifactLevelingCategory,
} from './common.interface';

export interface IAllArtifactLevelingCategoryResponse {
  artifactLevelingCategories: IArtifactLevelingCategory[];
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface IArtifactLevelingCategoryResponse {
  artifactLevelingCategory: IArtifactLevelingCategory;
  status: HttpStatus.FOUND | HttpStatus.NOT_FOUND;
}

export interface ICreatedArtifactLevelingCategoryResponse {
  artifactLevelingCategory: IArtifactLevelingCategory;
  status: HttpStatus.CREATED | HttpStatus.BAD_REQUEST;
}

export interface IUpdatedArtifactLevelingCategoryResponse {
  artifactLevelingCategory: IArtifactLevelingCategory;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}

export interface IDeletedArtifactLevelingCategoryResponse {
  artifactLevelingCategory: IDeletedArtifactLevelingCategory | null;
  status: HttpStatus.OK | HttpStatus.BAD_REQUEST;
}
