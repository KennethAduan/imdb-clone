-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMovie" (
    "id" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "SavedMovie_userId_idx" ON "SavedMovie"("userId");

-- CreateIndex
CREATE INDEX "SavedMovie_imdbId_idx" ON "SavedMovie"("imdbId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedMovie_userId_imdbId_key" ON "SavedMovie"("userId", "imdbId");

-- AddForeignKey
ALTER TABLE "SavedMovie" ADD CONSTRAINT "SavedMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
