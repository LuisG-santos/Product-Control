import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, "O nome é obrigatório"),
  price: z.number().min(1, "O preço é obrigatório"),
  stock: z
    .number()
    .positive()
    .int()
    .min(0, { error: "O estoque deve ser maior ou igual a zero" }),
});

export type UpsertProdutcSchema = z.infer<typeof upsertProductSchema>;
