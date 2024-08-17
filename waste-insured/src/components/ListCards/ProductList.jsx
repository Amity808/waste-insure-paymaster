'use client'
import React from 'react'
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi"
import { useReadContract } from "wagmi";
import Product from '../Cards/Product';

const ProductList = () => {
    const { data: data } = useReadContract({
        abi: wasteMarkeplace.abi,
        address: wasteMarkeplace.address,
        functionName: "getProductsLength",
        args: [],
      });

      const productLenght = data? Number(data.toString()) : 0;
      const getProductLength = () => {
        // if there is no waste recorded, return null 
        if(!productLenght) return null;
        const products = [];
        // looping through the data
        for (let i = 0; i < productLenght; i++) {
          products.push(
            <Product 
              key={i}
              id={i}
              />
              )
        }
        return products;
      }
  return (
    <div>
      <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {getProductLength()}
          </div>
      </div>
    </div>
  )
}

export default ProductList
