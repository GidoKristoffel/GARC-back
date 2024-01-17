/*
  Warnings:

  - You are about to drop the `EnhancementMaterial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EnhancementMaterial";

-- DropTable
DROP TABLE "Mob";

-- CreateTable
CREATE TABLE "enhancementMaterials" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "EnhancementMaterialType" NOT NULL,
    "rarity" "MaterialRarity" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "enhancementMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mobs" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "EnemyType" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "mobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnhancementMaterialMob" (
    "enhancementMaterialId" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,

    CONSTRAINT "EnhancementMaterialMob_pkey" PRIMARY KEY ("enhancementMaterialId","mobId")
);

-- AddForeignKey
ALTER TABLE "EnhancementMaterialMob" ADD CONSTRAINT "EnhancementMaterialMob_enhancementMaterialId_fkey" FOREIGN KEY ("enhancementMaterialId") REFERENCES "enhancementMaterials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnhancementMaterialMob" ADD CONSTRAINT "EnhancementMaterialMob_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "mobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
