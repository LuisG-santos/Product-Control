"use server";
import { actionClient } from "@/app/_lib/safe-action";
import { createSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const products = await db.products.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!products) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Produto não encontrado"],
          });
        }

        const productsIsOutOfStock = product.quantity > products.stock;

        if (productsIsOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Produto sem estoque suficiente"],
          });
        }

        await tx.saleProducts.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: products.price,
          },
        });

        await tx.products.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/products");
  });
