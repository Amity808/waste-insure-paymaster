'use client'
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { wasteInsure } from "@/abi/wasteInsured";
import { Generatepayment } from "@/abi/GeneralPayment";
import { utils, BrowserProvider } from "zksync-ethers";
// import { getWallet } from "../../utils/getwallet";
// import { useRouter } from "next/navigation";
import { getGeneralPaymasterInput } from "viem/zksync";

import { walletClient } from "@/helper/wagmiconfig";


const AddToken = () => {

  
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState('')
  
  const [tokenAddress, setTokenAddress] = useState("")
  const [fee, setFee] = useState("")
  const [Balance, setBalance] = useState("")

  const isFormFilled =
    tokenAddress && fee && Balance

  const handleClear = () => {
    setTokenAddress("")
    setFee("")
    setBalance("")
  };

  const handleToken = async () => {
    // e.preventDefault()
    setLoading("Registering.....")
    if(!isFormFilled) {
      toast.warn("Please fill the correct details")
      throw new Error("Please fill the correct details")
    }

    // let paymasterBalance = await provider.getBalance(Generatepayment.address);


    const [account] =
    typeof window !== "undefined" && window.ethereum
      ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
      : [];

  if (!account) {
    throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
  }

  // const wasteAmountInBigInt = BigInt(Math.round(wasteAmount * 1000000));

  const response = await walletClient.writeContract({
    address: wasteInsure.address,
    abi: wasteInsure.abi,
    functionName: "addNewToken",
    args: [
      tokenAddress, fee, Balance
    ],
    account,
    paymaster: Generatepayment.address,
    paymasterInput: getGeneralPaymasterInput({
      innerInput: new Uint8Array(),
    }),
  });
  console.log(response, " result");
  toast.success("Token added");
  handleClear();
      
  }

  const addToken = async (e) => {
    e.preventDefault()

    try {
      await toast.promise(
        handleToken(),
        {
          pending: "Adding New Token",
          success: "Successfully added new TOken",
          error: "Error why registering, You must be a waste-Insured Admin, Contact Admin"
        }
      )
    } catch (e) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong. Contact the Admin")
    }

    // router.push("/hospital")

  }
  return (
    <div className="flex mb-10">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#06102b] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Add Token
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <form onSubmit={addToken}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setTokenAddress(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="token Address"
                  id="tokenAddress"
                  placeholder="Token Address"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setFee(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="token fee"
                  id="fee"
                  placeholder="Token Fee"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setBalance(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="setBalance"
                  id="balance"
                  placeholder="Token Balance"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  disabled={!!loading || !isFormFilled || !addToken}
                >
                  {loading ? loading : "Add Token"}
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
  );
};

export default AddToken;
