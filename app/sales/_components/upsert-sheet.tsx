"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { products } from "@prisma/client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { useMemo } from "react";

interface UpsertSheetProps {
  products: products[];
  productOption: ComboboxOption[];
}

const formSchema = z.object({
  productId: z.uuid({message: "O produto é obrigatório"}),
  quantity: z.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheet = ({ products, productOption}: UpsertSheetProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find((product) => product.id === data.productId);

    if (!selectedProduct) return;

    setSelectedProduct((currentProducts) => {
      const existingProduct = currentProducts.find((product) => product.id === selectedProduct.id);
      if (existingProduct) {
        return currentProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product
        );
      }
      return [...currentProducts,{ ...selectedProduct,price: Number(selectedProduct.price), quantity: data.quantity }];
    });
    form.reset();
  };

  const productsTotal = useMemo(() => {
    return formatCurrency(selectedProduct.reduce((total, product) => total + product.price * product.quantity, 0));
  }, [selectedProduct]);

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    {...field}
                    options={productOption}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    value={isNaN(field.value) ? "" : field.value}
                    onChange={(e) => field.onChange(Number(e.target.valueAsNumber))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full gap-2" variant="secondary" type="submit">
            <CheckIcon className="mr-2 h-4 w-4" />
            Finalizar Venda
            </Button>
        </form>
      </Form>

      <Table>
      <TableCaption>Lista dos produtos selecionados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Preço unitário</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProduct.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right">{formatCurrency(product.price * product.quantity)}</TableCell>
          </TableRow>
        ))}

      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {productsTotal}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </SheetContent>
  );
};

export default UpsertSheet;
