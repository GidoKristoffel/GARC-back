-- CreateTable
CREATE TABLE "WeeklyBoss" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL DEFAULT '',
    "nameUa" TEXT NOT NULL DEFAULT '',
    "nameRu" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "descriptionUa" TEXT NOT NULL DEFAULT '',
    "descriptionRu" TEXT NOT NULL DEFAULT '',
    "type" "EnemyType" NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "WeeklyBoss_pkey" PRIMARY KEY ("id")
);
