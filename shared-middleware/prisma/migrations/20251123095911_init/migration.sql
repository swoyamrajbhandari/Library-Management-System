/*
  Warnings:

  - You are about to drop the column `access` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `act` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `eft` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `obj` on the `casbin_rule` table. All the data in the column will be lost.
  - You are about to drop the column `subj` on the `casbin_rule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "casbin_rule" DROP COLUMN "access",
DROP COLUMN "act",
DROP COLUMN "eft",
DROP COLUMN "obj",
DROP COLUMN "subj",
ADD COLUMN     "v0" TEXT,
ADD COLUMN     "v1" TEXT,
ADD COLUMN     "v2" TEXT,
ADD COLUMN     "v3" TEXT,
ADD COLUMN     "v4" TEXT;
