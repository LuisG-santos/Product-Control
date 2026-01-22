import { BoxIcon, LayoutGrid, Package, ShoppingBasket } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-64 bg-white text-start rounded-r-lg">
            <div className="px-5 py-2 border-b rounded-lg border-zinc-200">
                <h1 className="text-2xl text-black font-bold p-4 ">STOCK</h1>
            </div>

            <div className="flex flex-col gap-2 p-2 ">
                <button className="px-6 py-3 text-start text-zinc-500 hover:bg-zinc-200 selection:text-black rounded-md">
                    <LayoutGrid className="inline mr-2 mb-1" size={16} />
                    Dashboard
                </button>

                <button className="px-6 py-3 text-start text-zinc-500 hover:bg-zinc-200 selection:text-black rounded-md">
                    <Package className="inline mr-2 mb-1" size={16} />
                    Produtos
                </button>

                <button className="px-6 py-3 text-start text-zinc-500 hover:bg-zinc-200 selection:text-black rounded-md">
                    <ShoppingBasket className="inline mr-2 mb-1" size={16} />
                    Vendas
                </button>
               
            </div>

        </div>
    );
}
 
export default Sidebar;