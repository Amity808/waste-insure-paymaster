import React, { useState, useEffect, useCallback } from 'react'
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi"
import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import Link from 'next/link';

const Product = ({ id }) => {
    const { data: readProduct } = useReadContract({
        abi: wasteMarkeplace.abi,
        address: wasteMarkeplace.address,
        functionName: "readProduct",
        args: [id],
      })

      const [product, setProduct] = useState(null)


    // format the product data get from the database contract
    const getFormatedProduct = useCallback(() => {
        if(!readProduct) return null;
        setProduct({
            owner: readProduct[0],
            name: readProduct[1],
            image: readProduct[2],
            description: readProduct[3],
            location: readProduct[4],
            price: Number(readProduct[5]),
            sold: Number(readProduct[6]),
            quantity: Number(readProduct[7]),
            available: Boolean(readProduct[8]),
        });
    }, [readProduct])

    // make a call with useEffect when the getFormatedProduct get called 
    useEffect(() => {
      getFormatedProduct()
    }, [getFormatedProduct])


  return (
    <div className={"shadow-lg relative rounded-b-lg"}>
    <p className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-white xl:aspect-w-7 xl:aspect-h-8 ">
        {/* Show the number of products sold */}
        <span
          className={
            "absolute z-10 right-0 mt-4 bg-amber-400 text-black p-1 rounded-l-lg px-4"
          }
        >
          {product?.sold} sold
        </span>
        {/* Show the product image */}
        <img
          src={product?.image}
          alt={"image"}
          className="w-full h-80 rounded-t-md  object-cover object-center group-hover:opacity-75"
        />
        {/* Show the address of the product owner as an identicon and link to the address on the zksync Explorer */}
        <Link
          href={`https://sepolia.explorer.zksync.io/address/${product?.owner}`}
          className={"absolute -mt-7 ml-6 h-16 w-16 rounded-full"}
        >
          {/* {identicontemplates(product?.owner)} */}
        </Link>
      </div>

      <div className={"m-5"}>
        <div className={"pt-1"}>
          {/* Show the product name */}
          <p className="mt-4 text-2xl font-bold">{product?.name}</p>
          <div className={"h-40 overflow-y-hidden scrollbar-hide"}>
            {/* Show the product description */}
            <h3 className="mt-4 text-sm text-gray-700">
              {product?.description}
            </h3>
          </div>
        </div>

        <div>
          <div className={"flex flex-row justify-between"}>

            <h3 className="pt-1 text-sm text-gray-700">{product?.location}</h3>
            <h3 className="pt-1 text-sm text-gray-700">{product?.quantity} Units</h3>
          </div>

          
          <button
              className="mt-4 h-14 w-full border-[1px] border-gray-500 text-black p-2 rounded-lg hover:bg-black hover:text-white"
            >
              
              Not Available
            </button>
        </div>
      </div>
    </p>
  </div>
  )
}

export default Product