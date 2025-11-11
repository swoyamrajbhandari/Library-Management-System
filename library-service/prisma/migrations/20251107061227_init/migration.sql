-- DropForeignKey
ALTER TABLE "libraryMS"."BookCopy" DROP CONSTRAINT "BookCopy_bookId_fkey";

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
