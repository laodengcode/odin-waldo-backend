-- CreateTable
CREATE TABLE "GameImage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "naturalW" INTEGER NOT NULL,
    "naturalH" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "x_pct" DOUBLE PRECISION NOT NULL,
    "y_pct" DOUBLE PRECISION NOT NULL,
    "w_pct" DOUBLE PRECISION NOT NULL,
    "h_pct" DOUBLE PRECISION NOT NULL,
    "gameImageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "timeMs" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameImageId_fkey" FOREIGN KEY ("gameImageId") REFERENCES "GameImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
