
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { products } from "@prisma/client";
import { useState } from "react";


interface MoreActionsProps {
  product: Pick<products, "id">;
  onDelete: (productId: string) => void;
}



const MoreActions = ({ product, onDelete }: MoreActionsProps) => {
    const [isCopied, setIsCopied] = useState('Copiar ID');
    const handleCopy = () => {
      navigator.clipboard.writeText(product.id).
      then(() => {
        setIsCopied('ID copiado!');
        setTimeout(() => setIsCopied('Copiar ID'), 3000);
      });
      
    }

    return ( 
        <DropdownMenu>

          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-lg bg-white dark:bg-zinc-900">
            <DropdownMenuItem
              className="gap-1.5"
              onClick={handleCopy}
            >
              <ClipboardCopyIcon size={16} />
              {isCopied}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-1.5" onClick={() => onDelete(product.id)}>
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
        
          </DropdownMenuContent>
        </DropdownMenu>
     );
}
 
export default MoreActions;