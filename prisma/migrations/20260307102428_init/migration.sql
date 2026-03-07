-- CreateTable
CREATE TABLE "Figure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "series" TEXT,
    "manufacturer" TEXT,
    "scale" TEXT,
    "price" DOUBLE PRECISION,
    "purchaseDate" TIMESTAMP(3),
    "condition" TEXT NOT NULL DEFAULT 'mint',
    "imageUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);
