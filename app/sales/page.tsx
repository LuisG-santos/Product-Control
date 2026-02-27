import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-accsess/products/getProducts";
import UpsertSheet from "./_components/upsert-sheet";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <div className="h-full space-y-8 overflow-auto rounded-xl bg-white p-5 dark:bg-black">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de vendas
          </span>
          <h2 className="text-2xl font-semibold">Vendas</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova venda</Button>
          </SheetTrigger>
          <UpsertSheet products={products} productOption={productOptions}/>
        </Sheet>
      </div>

      {/* <DataTable columns={productsTableCol} data={products} /> */}
    </div>
  );
};

export default SalesPage;
