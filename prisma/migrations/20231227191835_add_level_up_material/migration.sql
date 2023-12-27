-- CreateEnum
CREATE TYPE "LevelUpMaterialType" AS ENUM ('REGULAR_BOSS_REWARDS', 'WEEKLY_BOSS_REWARDS');

-- CreateTable
CREATE TABLE "LevelUpMaterial" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "LevelUpMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "LevelUpMaterial_pkey" PRIMARY KEY ("id")
);
