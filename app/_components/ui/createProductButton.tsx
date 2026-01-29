"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "./button";

 const handleCreateProduct = async () => {
   
  };

const CreateProductsButton = () => {
  return (
    <Button variant="default" onClick={handleCreateProduct}>
      <PlusIcon size={16} />
      Cadastrar Produto
    </Button>
  );
};

export default CreateProductsButton;
