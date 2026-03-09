
import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data-accsess/products/getProducts";
import CreateSaleButton from "./_components/create-sale-button";


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
        <CreateSaleButton products={products} productOption={productOptions} />
      </div>


    </div>
  );
};

export default SalesPage;
