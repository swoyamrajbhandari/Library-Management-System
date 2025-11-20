-- CreateTable
CREATE TABLE "casbin_rule" (
    "id" SERIAL NOT NULL,
    "ptype" TEXT,
    "v0" TEXT NOT NULL,
    "v1" TEXT NOT NULL,
    "v2" TEXT NOT NULL,
    "v3" TEXT NOT NULL,
    "v4" TEXT NOT NULL,
    "v5" TEXT NOT NULL,

    CONSTRAINT "casbin_rule_pkey" PRIMARY KEY ("id")
);
