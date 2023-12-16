-- CreateEnum
CREATE TYPE "MaterialRarity" AS ENUM ('UNCOMMON', 'RARE', 'EPIC');

-- CreateEnum
CREATE TYPE "TalentMaterialType" AS ENUM ('BOOK', 'CROWN');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "TalentMaterials" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "TalentMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "region" "Region" NOT NULL,
    "farmDays" "Day"[],
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "TalentMaterials_pkey" PRIMARY KEY ("id")
);
