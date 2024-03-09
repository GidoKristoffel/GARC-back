-- CreateTable
CREATE TABLE "UserArtifactLevelingCategory" (
    "userId" TEXT NOT NULL,
    "artifactLevelingCategoryId" TEXT NOT NULL,

    CONSTRAINT "UserArtifactLevelingCategory_pkey" PRIMARY KEY ("userId","artifactLevelingCategoryId")
);

-- AddForeignKey
ALTER TABLE "UserArtifactLevelingCategory" ADD CONSTRAINT "UserArtifactLevelingCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArtifactLevelingCategory" ADD CONSTRAINT "UserArtifactLevelingCategory_artifactLevelingCategoryId_fkey" FOREIGN KEY ("artifactLevelingCategoryId") REFERENCES "ArtifactLevelingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
