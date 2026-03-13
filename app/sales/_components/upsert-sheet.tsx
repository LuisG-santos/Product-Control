"use client";

import {
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import {CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { products } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { useMemo } from "react";
import MoreActions from "./more-actions";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";

interface UpsertSheetProps {
  products: products[];
  productOption: ComboboxOption[];
  onSubmitSuccess?: () => void;
}

const formSchema = z.object({
  productId: z.uuid({ message: "O produto é obrigatório" }),
  quantity: z.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheet = ({
  products,
  productOption,
  onSubmitSuccess,
}: UpsertSheetProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0], { position: "top-center" });
    },
    onSuccess: () => {
      toast.success("Venda criada com sucesso", { position: "top-center" });
      onSubmitSuccess?.();
    },
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );

    if (!selectedProduct) return;

    setSelectedProduct((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;

        if (productIsOutOfStock) {
          form.setError("quantity", {
            message: `Quantidade excede o estoque disponível (${selectedProduct.stock})`,
          });
          return currentProducts;
        }
        form.reset();
        return currentProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product,
        );
      }
      const productIsOutOfStock = data.quantity > selectedProduct.stock;

      if (productIsOutOfStock) {
        form.setError("quantity", {
          message: `Quantidade excede o estoque disponível (${selectedProduct.stock})`,
        });
        
        if(selectedProduct.stock === 0) {
          form.setError("quantity", {
            message: `Produto sem estoque disponível`,
          });
        }
        return currentProducts;
      }

      form.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return formatCurrency(
      selectedProduct.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      ),
    );
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const onSubmitSale = async () => {
    executeCreateSale({
      products: selectedProduct.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

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
                    onChange={(e) =>
                      field.onChange(Number(e.target.valueAsNumber))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full gap-2" variant="secondary" type="submit">
            <PlusIcon className="mr-2 h-4 w-4" />
            Adicionar produto a venda
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
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell className="text-right">
                <MoreActions product={{ id: product.id }} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{productsTotal}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-6">
        <Button
          disabled={selectedProduct.length === 0}
          onClick={onSubmitSale}
          className="w-full"
        >
          <CheckIcon className="mr-2 h-4 w-4" />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheet;
