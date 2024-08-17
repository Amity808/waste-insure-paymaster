import React, { useState } from "react";
import useLoading from "@/hooks/useLoading";
import { IoCloseCircle } from "react-icons/io5";
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi";
import { walletClient, publicClient } from "@/helper/wagmiconfig";
import { toast } from "react-toastify";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from "wagmi";

const BecomeSeller = () => {
  const { address } = useAccount();
  const [addressSeller, setAddressSeller] = useState("");
  const [toggle, setToggle] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const paymaster = "0x7afF0B53fe17231195968869c39B1D33599eDaB1";
  
  const isFormFilled = addressSeller;


  const clearFormInput = () => {
      setAddressSeller("")
    };


  const handleWrite = async () => {
    const [account] =
      typeof window !== "undefined" && window.ethereum
        ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
        : [];

    if (!account) {
      throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
    }


    const { request } = publicClient.simulateContract({
      address: wasteMarkeplace.address,
      abi: wasteMarkeplace.abi,
      functionName: "assignSeller",
      args: [addressSeller],
      account,
      paymaster: paymaster,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: new Uint8Array(),
      })
    });
    try {
      const response = await walletClient.writeContract({
        address: wasteMarkeplace.address,
      abi: wasteMarkeplace.abi,
      functionName: "assignSeller",
      args: [addressSeller],
      account,
      paymaster: paymaster,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: new Uint8Array(),
      })
      });
      console.log(response);
      // toast.success("Product added successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(isLoading);

  const assignerSeller = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      // await handleWrite();
      await toast.promise(handleWrite(), {
        pending: "Assigning seller",
        success: "Successfully, address is now a Seller.",
        error: "Try again.",
      });
      stopLoading();
      clearFormInput();
    } catch (error) {
      stopLoading();
      console.log(error);
    }
  };

  return (
    <div className=" flex rounded-xl">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Become a seller
      </button>
      {toggle && (
        <div className="flex justify-center fixed z-20 left-0 top-0 items-center w-full h-full mt-6">
          <div className=" w-[600px] rounded-2xl bg-slate-100 p-5">
            <h1 className=" text-[#131825] mt-5 font-bold max-md:text-white max-sm:text-white">
              Your Must Be Seller Before You Can sell
            </h1>
            <form onSubmit={assignerSeller}>
              {/* <input
                type="text"
                onChange={(e) => setAddressSeller(e.target.value)}
                name="WasteItemseller"
                id="wasteItemseller"
                className=" mt-5 py-4 px-6 w-full rounded-full text-black border-2 border-[#111247]"
                placeholder="Enter seller Address"
              /> */}
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setAddressSeller(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="sellerAddress"
                  id="seller address"
                  placeholder="Enter Seller address"
                />
              </div>
              <div className=" flex justify-between mt-5">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  disabled={!!isLoading || !isFormFilled}
                >
                  {isLoading ? isLoading : "Assigning seller"}
                </button>
                <button
                  type="button"
                  className=""
                  onClick={() => setToggle(false)}
                >
                  <IoCloseCircle size={30} color="#efae07" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeSeller;
