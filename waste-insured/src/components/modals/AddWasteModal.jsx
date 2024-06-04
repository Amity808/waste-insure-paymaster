import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { toast } from "react-toastify";
import { wasteInsure } from "@/abi/wasteInsured";
import { gaslessPaymasterContract } from "../../abi/paymaster-contract";
import { ethers } from "ethers";
import { Generatepayment } from "@/abi/GeneralPayment";

import { useAccount } from "wagmi";
import { utils, BrowserProvider } from "zksync-ethers";
import { getWallet } from "../../utils/getwallet";
import { useWriteContract, useSimulateContract, useReadContract } from "wagmi";

const AddWasteModal = () => {
  const [name, setName] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [collectionLocation, setCollectionLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  // to open the modal state
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState("");

  const { address } = useAccount();
  // to open the connect modal 
  const { openConnectModal } = useConnectModal();

  // to check if the form is filled
  const isFormFilled =
    name &&
    wasteType &&
    collectionLocation &&
    weight &&
    wasteAmount &&
    hospitalAddress;

  // clear the form when the form is filed
  const handleClear = () => {
    setName("");
    setWasteType("");
    setCollectionLocation("");
    setWeight("");
    setWasteAmount(0);
    setHospitalAddress("");
  };

  // interact the with smart contract
  let provider;

  if (typeof window !== "undefined" && window.ethereum) {
    provider = new BrowserProvider(window.ethereum);
  }

  

  const wallet = getWallet(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY);

  const contractWasteInsured = new ethers.Contract(
    wasteInsure.address,
    wasteInsure.abi,
    wallet
  );

  
  const paymasterParams = utils.getPaymasterParams(Generatepayment.address, {
    type: "General",
    innerInput: new Uint8Array(),
  });


  const addwastepromise = async () => {
    // e.preventDefault();
    // try {
      
      // setLoading("Record.....");
      // toast.loading("Record.....")
      if (!isFormFilled) throw new Error("Please fill the correct details");
  
      let paymasterBalance = await provider.getBalance(Generatepayment.address);
  
      console.log("Balance paymaster ", paymasterBalance.toString());
  
      const wasteAmountInBigInt = BigInt(Math.round(wasteAmount * 1000000));
      const result = await contractWasteInsured.recordWaste(
        name,
        wasteType,
        collectionLocation,
        weight,
        wasteAmountInBigInt,
        hospitalAddress,
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );
      await result.wait()
      console.log(result, " result");
      toast.success("Waste Recorded")
      console.log("Afer paymaster ", paymasterBalance.toString());
      handleClear();
    // } catch (error) {
      // console.log(error," error");
    //   toast.error("Something Went wrong. Try record waste, ");
    // }

  }
 



  
  const addwaste = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(addwastepromise(), {
        pending: "Recording waste",
        success: "Waste Recorded",
        error: "Error Recording Waste, you are not a Collector or insuccificient gas fee in bootloader",
      });
    } catch (e) {
      console.log({ e });
      toast.error("Something Went wrong. Try record waste, ");
    }
  };

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
        Submit Waste
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <form onSubmit={addwaste}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteType"
                  id="wasteType"
                  placeholder="Depositor Full Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setWasteType(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteType"
                  id="wasteType"
                  placeholder="WasteType"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setCollectionLocation(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="collectionLocation"
                  id="collectionLocation"
                  placeholder="Hospital Location"
                />
              </div>

              <div className="mb-8">
                <input
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteKg"
                  id="wasteKg"
                  placeholder="Waste Kg"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setWasteAmount(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="wasteAmount"
                  id="wasteAmount"
                  placeholder="Waste Amount"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setHospitalAddress(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="hospitaladdress"
                  id="hospitalAddress"
                  placeholder="Hospital wallet Address"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  // disabled={!!loading || !isFormFilled || !recordWaste}
                >
                  {loading ? loading : "Record Waste"}
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

export default AddWasteModal;

// "address" : "0x0452F805d508DDBbE95Da610b507033fa6807a77",
