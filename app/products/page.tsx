"use server"
import { DataTable } from "../_components/ui/data-table";
import { productsTableCol } from "./_components/table-colums";
import CreateProductsButton from "./_components/createProductButton";
import { getProducts } from "../_data-accsess/products/getProducts";
import { cache } from "react";

const ProductsPage = async () => {
 const products = await getProducts();

  return (
    <div className="h-full space-y-8 rounded-xl bg-white p-5 overflow-auto dark:bg-black">
      <div className="flex items-center  justify-between">
        <div className="space-y-1 flex flex-col">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>

        <CreateProductsButton/>
      </div>
      <DataTable columns={productsTableCol} data={products} />
    </div>
  );
};

export default ProductsPage;
