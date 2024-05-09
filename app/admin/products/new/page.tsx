import React from "react";
import PageHeader from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

const NewProduct = () => {
  return (
    <div>
      <PageHeader title="Add New Product" />
      <ProductForm></ProductForm>

    </div>
  );
};

export default NewProduct;
