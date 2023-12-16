/*
  Warnings:

  - You are about to drop the `TalentMaterials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TalentMaterials";

-- CreateTable
CREATE TABLE "TalentMaterial" (
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

    CONSTRAINT "TalentMaterial_pkey" PRIMARY KEY ("id")
);
