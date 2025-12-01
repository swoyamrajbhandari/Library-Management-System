/*
  Warnings:

  - A unique constraint covering the columns `[method,route]` on the table `api_routes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "api_routes_method_route_key" ON "api_routes"("method", "route");
