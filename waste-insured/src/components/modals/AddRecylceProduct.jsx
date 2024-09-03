import React, { useState } from "react";
import useLoading from "@/hooks/useLoading";
import { IoCloseCircle } from "react-icons/io5";
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi"
import { walletClient, publicClient } from "@/helper/wagmiconfig";
import { toast } from "react-toastify";
import { getGeneralPaymasterInput } from "viem/zksync"
const AddRecylceProduct = () => {

    const { isLoading, startLoading, stopLoading } = useLoading();
const paymaster = '0x7afF0B53fe17231195968869c39B1D33599eDaB1'
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [toggle, setToggle] = useState(false);

  const clearFormInput = () => {
    setProductName("");
    setProductImage("");
    setDescription("");
    setLocation("");
    setPrice("");
    setQuantity("");
  };

  const handleWrite = async () => {

    const [account] =
      typeof window !== "undefined" && window.ethereum
        ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
        : [];

    if (!account) {
      throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
    }

    const {request} = publicClient.simulateContract({
        address: wasteMarkeplace.address,
            abi: wasteMarkeplace.abi,
            functionName: "writeProduct",
            args: [productName, productImage, description, location, price, quantity],
            account,
            paymaster: paymaster,
            paymasterInput: getGeneralPaymasterInput({ innerInput: new Uint8Array() }),
    })
    try {
        const response = await walletClient.writeContract({
            // ...request
            address: wasteMarkeplace.address,
            abi: wasteMarkeplace.abi,
            functionName: "writeProduct",
            args: [productName, productImage, description, location, price, quantity],
            account,
            paymaster: paymaster,
            paymasterInput: getGeneralPaymasterInput({ innerInput: new Uint8Array() }),
        })
        console.log(response)
        // toast.success("Product added successfully!");
    } catch (error) {
        console.log(error)
    }
  }
  console.log(isLoading)
  const saveProduct = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      
        // await handleWrite();
       await toast.promise(
            handleWrite(), {
                pending: "Adding Product",
                success: "Product added successfully!",
                error: "Unexpected error contact Admin",
  
            }
        )
        clearFormInput()
        stopLoading();
    } catch (error) {
      stopLoading();
      console.log(error)
    }
  };



  return (
    <div className="flex mb-10 ">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Add Product
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <form onSubmit={saveProduct}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl text-white"
                  name="prudctname"
                  id="productname"
                  placeholder="Prodct Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setProductImage(e.target.value)}
                  className="border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="ProductImage"
                  id="ProductImage"
                  placeholder="ProductImage"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="description"
                  id="description"
                  placeholder="description"
                />
              </div>

              <div className="mb-8">
                <input
                  type="test"
                  onChange={(e) => setLocation(e.target.value)}
                  className=" border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="location"
                  id="location"
                  placeholder="location"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setQuantity(e.target.value)}
                  className=" border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="quantity"
                  id="quantity"
                  placeholder="quantity"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  className=" border-4 w-full text-white border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="price"
                  id="price"
                  placeholder="price"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  // disabled={!!loading || !isFormFilled || !recordWaste}
                >
                  { "Save"}
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );;
};

export default AddRecylceProduct;
