-- CreateEnum
CREATE TYPE "EnhancementMaterialType" AS ENUM ('GENERAL_DROPS', 'ELITE_DROPS');

-- CreateTable
CREATE TABLE "EnhancementMaterial" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "EnhancementMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "EnhancementMaterial_pkey" PRIMARY KEY ("id")
);
