-- CreateEnum
CREATE TYPE "AscensionMaterialType" AS ENUM ('GEMS_OF_EXALTATION');

-- AlterEnum
ALTER TYPE "MaterialRarity" ADD VALUE 'LEGENDARY';

-- CreateTable
CREATE TABLE "AscensionMaterial" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "AscensionMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "AscensionMaterial_pkey" PRIMARY KEY ("id")
);
