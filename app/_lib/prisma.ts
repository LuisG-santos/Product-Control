import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const createPrismaClient = () => {
  return new PrismaClient().$extends({
    result: {
      products: {
        status: {
          needs: { stock: true },
          compute(products: { stock: number }) {
            if (products.stock <= 0) {
              return "out_of_stock";
            }
            return "in_stock";
          },
        },
      },
    },
  });
};

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
