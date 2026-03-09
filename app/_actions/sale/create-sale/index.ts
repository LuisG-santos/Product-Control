"use server";
import { CreateSaleSchema, createSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";

interface CreateSaleResponse {
  data: any;
 error?: any;
}

export const createSale = async (data: CreateSaleSchema): Promise<CreateSaleResponse> => {
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
        return {
          error: `Produto com id ${product.id} não encontrado`,
        };
      }

      const productsIsOutOfStock = product.quantity > products.stock;

      if (productsIsOutOfStock) {
        return {
          error: `Produto ${products.name} está sem estoque suficiente`,
        };
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
  return { data: "Venda criada com sucesso" };
};
