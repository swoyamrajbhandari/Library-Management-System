-- CreateTable
CREATE TABLE "api_routes" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "api_routes_pkey" PRIMARY KEY ("id")
);
