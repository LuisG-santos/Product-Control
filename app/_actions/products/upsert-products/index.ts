"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProdutcSchema } from "./schema";

export const upsertProducts = async (data: UpsertProdutcSchema) => {
  upsertProductSchema.parse(data);
  await db.products.upsert({
    where:{id: data.id ?? ""},
    update: data,
    create: data,
  });
  revalidatePath("/products");
};
