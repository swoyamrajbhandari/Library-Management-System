/*
  Warnings:

  - You are about to drop the column `v0` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `v1` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `v2` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `v3` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `v4` on the `casbin_rule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "casbin_rule" DROP COLUMN "v0",
DROP COLUMN "v1",
DROP COLUMN "v2",
DROP COLUMN "v3",
DROP COLUMN "v4",
ADD COLUMN     "subj" TEXT,
ADD COLUMN     "obj" TEXT,
ADD COLUMN     "act" TEXT,
ADD COLUMN     "access" TEXT,
ADD COLUMN     "eft" TEXT;

-- CreateTable
CREATE TABLE "api_routes" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "api_routes_pkey" PRIMARY KEY ("id")
);
