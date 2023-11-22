-- CreateEnum
CREATE TYPE "Quality" AS ENUM ('EPIC', 'LEGENDARY', 'OTHER');

-- CreateEnum
CREATE TYPE "Element" AS ENUM ('ANEMO', 'GEO', 'ELECTRO', 'DENDRO', 'HYDRO', 'PYRO', 'CRYO', 'OTHER');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('MONDSTADT', 'LIYUE', 'INAZUMA', 'SUMERU', 'FONTAINE', 'NATLAN', 'SNEZHNAYA', 'OTHER');

-- CreateEnum
CREATE TYPE "BonusAttribute" AS ENUM ('CRIT_DMG', 'ELEMENTAL_MASTERY', 'ENERGY_RECHARGE', 'CRIT_RATE', 'HP', 'HEALING_BONUS', 'PHYSICAL_DMG_BONUS', 'ATK', 'DEF', 'PYRO_DMG_BONUS', 'HYDRO_DMG_BONUS', 'DENDRO_DMG_BONUS', 'ELECTRO_DMG_BONUS', 'CRYO_DMG_BONUS', 'ANEMO_DMG_BONUS', 'GEO_DMG_BONUS', 'OTHER');

-- CreateEnum
CREATE TYPE "Weapon" AS ENUM ('SWORD', 'CLAYMORE', 'BOW', 'CATALYST', 'POLEARM', 'OTHER');

-- CreateEnum
CREATE TYPE "Arche" AS ENUM ('USIA', 'PNEUMA');

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "quality" "Quality" NOT NULL,
    "elementalType" "Element" NOT NULL,
    "region" "Region" NOT NULL,
    "bonusAttribute" "BonusAttribute" NOT NULL,
    "weapon" "Weapon" NOT NULL,
    "constellationEn" TEXT NOT NULL DEFAULT '',
    "constellationUa" TEXT NOT NULL DEFAULT '',
    "constellationRu" TEXT NOT NULL DEFAULT '',
    "arche" "Arche"[],
    "birthday" TIMESTAMP(3) NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleUa" TEXT NOT NULL DEFAULT '',
    "titleRu" TEXT NOT NULL DEFAULT '',
    "affiliationEn" TEXT NOT NULL DEFAULT '',
    "affiliationUa" TEXT NOT NULL DEFAULT '',
    "affiliationRu" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "splashArt" TEXT NOT NULL DEFAULT '',
    "cardIcon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCharacters" (
    "userId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "UserCharacters_pkey" PRIMARY KEY ("userId","characterId")
);

-- AddForeignKey
ALTER TABLE "UserCharacters" ADD CONSTRAINT "UserCharacters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCharacters" ADD CONSTRAINT "UserCharacters_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
