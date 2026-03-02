"use server";
import { CreateSaleSchema, createSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  await db.$transaction(async (tx) => {

    const sale = await tx.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const product of data.products) {
      const products = await db.products.findUnique({
        where: {
          id: product.id,
        },
      });

      if (!products) {
        throw new Error(`Produto com id ${product.id} não encontrado`);
      }

      const productsIsOutOfStock = product.quantity > products.stock;

      if (productsIsOutOfStock) {
        throw new Error(
          `Quantidade do produto ${products.name} excede o estoque disponível (${products.stock})`,
        );
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
};
