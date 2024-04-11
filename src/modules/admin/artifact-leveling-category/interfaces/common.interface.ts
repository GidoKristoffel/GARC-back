export interface IArtifactLevelingCategory {
  id: string;
  name: {
    en: string;
    ua: string;
    ru: string;
  };
  index: number;
}

export interface IArtifactLevelingCategoryCreate {
  nameEn: string;
  nameUa: string;
  nameRu: string;
  index: number;
}

export interface IUserArtifactLevelingCategoryCreate {
  userId: string;
  artifactLevelingCategoryId: string;
}

export interface IDeletedArtifactLevelingCategory {
  id: string;
}
