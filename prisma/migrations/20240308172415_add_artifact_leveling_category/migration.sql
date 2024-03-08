-- CreateTable
CREATE TABLE "ArtifactLevelingCategory" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "index" INTEGER NOT NULL,

    CONSTRAINT "ArtifactLevelingCategory_pkey" PRIMARY KEY ("id")
);
