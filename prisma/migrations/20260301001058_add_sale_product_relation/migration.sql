-- DropForeignKey
ALTER TABLE "saleProducts" DROP CONSTRAINT "saleProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "saleProducts" DROP CONSTRAINT "saleProducts_saleId_fkey";

-- AddForeignKey
ALTER TABLE "saleProducts" ADD CONSTRAINT "saleProducts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saleProducts" ADD CONSTRAINT "saleProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
