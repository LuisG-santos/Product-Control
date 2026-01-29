
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { productsTableCol } from "./_components/table-colums";
import CreateProductsButton from "../_components/ui/createProductButton";

const ProductsPage = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

 
  return (
    <div className="space-y-8 h-full rounded-xl bg-white dark:bg-black p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>

      <CreateProductsButton />
      </div>
      <DataTable columns={productsTableCol} data={products} />
    </div>
  );
};

export default ProductsPage;
