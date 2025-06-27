/*
  Warnings:

  - A unique constraint covering the columns `[id,stream_id]` on the table `nodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nodes_id_stream_id_key" ON "nodes"("id", "stream_id");
