-- CreateEnum
CREATE TYPE "MobType" AS ENUM ('OTHER_HUMAN_FACTIONS', 'AUTOMATONS', 'FATUI', 'ENEMIES_OF_NOTE', 'HILICHURLS', 'ELEMENTAL_LIFEFORMS', 'THE_ABYSS', 'MYSTICAL_BEASTS');

-- CreateTable
CREATE TABLE "Mob" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "MobType" NOT NULL,

    CONSTRAINT "Mob_pkey" PRIMARY KEY ("id")
);
