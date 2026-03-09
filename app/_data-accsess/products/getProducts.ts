import "server-only";
import { db } from "@/app/_lib/prisma";
import { products } from "@prisma/client";

export const getProducts = async (): Promise<products[]> => {
    const products = await db.products.findMany({});
    const response = JSON.parse(JSON.stringify(products)) as products[];
    return response;
};