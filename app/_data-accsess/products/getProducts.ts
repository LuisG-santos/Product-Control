import { db } from "@/app/_lib/prisma";
import { products } from "@prisma/client";

export const getProducts = async (): Promise<products[]> => {
    return db.products.findMany({});
};