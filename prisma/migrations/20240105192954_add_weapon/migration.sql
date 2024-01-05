/*
  Warnings:

  - Changed the type of `weapon` on the `characters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WeaponBonusAttribute" AS ENUM ('ATK', 'PHYSICAL_DMG_BONUS', 'DEF', 'CRIT_RATE', 'CRIT_DMG', 'ELEMENTAL_MASTERY', 'ENERGY_RECHARGE', 'HP');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('SWORD', 'CLAYMORE', 'BOW', 'CATALYST', 'POLEARM', 'OTHER');

-- CreateEnum
CREATE TYPE "WeaponQuality" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- AlterEnum
ALTER TYPE "MaterialRarity" ADD VALUE 'COMMON';

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "weapon",
ADD COLUMN     "weapon" "WeaponType" NOT NULL;

-- DropEnum
DROP TYPE "Weapon";

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "abilityDescriptionEn" TEXT NOT NULL DEFAULT '',
    "abilityDescriptionUa" TEXT NOT NULL DEFAULT '',
    "abilityDescriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "WeaponType" NOT NULL,
    "bonusAttribute" "WeaponBonusAttribute" NOT NULL,
    "quality" "WeaponQuality" NOT NULL,
    "region" "Region" NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);
