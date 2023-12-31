-- CreateEnum
CREATE TYPE "WeaponMaterialType" AS ENUM ('ASCENSION', 'REFINEMENT');

-- CreateTable
CREATE TABLE "WeaponMaterial" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "WeaponMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "region" "Region" NOT NULL,
    "farmDays" "Day"[],
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "WeaponMaterial_pkey" PRIMARY KEY ("id")
);
