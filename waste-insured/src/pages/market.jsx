import React from "react";
import AddRecylceProduct from "@/components/modals/AddRecylceProduct";
import ProductList from "@/components/ListCards/ProductList";
const Market = () => {
  return (
    <div className="pt-4 container mx-auto px-8 text-black">
      <div>
        <AddRecylceProduct />
      </div>
      <div>
        <p>You must contact Admin to become a seller before you sell waste recycled Product.</p>
      </div>
      <div className="pt-4 container mx-auto px-8">
        <ProductList />
      </div>
    </div>
  );
};

export default Market;
