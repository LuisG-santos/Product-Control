
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "../_components/ui/data-table";
import { productsTableCol } from "./_components/table-colums";
import { getProducts } from "../_data-accsess/products/getProducts";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="m-8 mx-8 my-8 mt-8 w-full space-y-8 rounded-xl bg-white p-5">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-2xl font-semibold">Produtos</h2>
        </div>

        <Button variant="default">
          <PlusIcon size={16} />
          Cadastrar Produto
        </Button>
      </div>
      <DataTable columns={productsTableCol} data={products} />
    </div>
  );
};

export default ProductsPage;
