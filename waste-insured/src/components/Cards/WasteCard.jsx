// 'use client'
import React, {useCallback} from 'react'
import { ethers } from 'ethers'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { truuncateAddress } from '@/utils/index';
import { wasteInsure } from '@/abi/wasteInsured'
import { Generatepayment } from '@/abi/GeneralPayment'
import { getGeneralPaymasterInput } from "viem/zksync";
// import { walletClient } from '@/helper/wagmiconfig'
// import { walletClient } from "@/helper/wagmiconfig";
import { createWalletClient, custom, http } from "viem";
import { eip712WalletActions } from "viem/zksync";
import { zkSyncSepoliaTestnet } from "wagmi/chains";

const WasteCard = ({id, setError, setLoading, clear, searchQuery}) => {
  
  

  // to get the address that is connect to the dapp
  const { address } = useAccount();
  const [tokenInput, setTokenInput] = useState("0xf333c5BA38A6a8C83877E0B7a99836F28219c0F6");
// initializing providers
 
  




  const { data: getWasteInfo } = useReadContract({
    abi: wasteInsure.abi,
    address: wasteInsure.address,
    functionName: "getWasteInfo",
    args: [id],
  })

  const [waste, setWaste] = useState(null)


  const getFormattedProduct = useCallback(() => {
    // return null if there not product to return
    if (!getWasteInfo) return null;

    setWaste({
      wassetWasteAdmin: getWasteInfo[0],
      producer: getWasteInfo[1],
      depositor: getWasteInfo[2],
      wasteType: getWasteInfo[3],
      collectionLocation: getWasteInfo[4],
      weight: Number(getWasteInfo[5]),
      isRecorded: Boolean(getWasteInfo[6]),
      isValidated: Boolean(getWasteInfo[7]),
      isPaid: Boolean(getWasteInfo[8]),
      wasteAmount: Number(getWasteInfo[9]),
      hospitalAdress: getWasteInfo[10]
    })
  }, [getWasteInfo])

  // we use the useEffect the waste management system state changes

  useEffect(() => {
    getFormattedProduct();
  }, [getFormattedProduct]);

  // function to hand the waste payment
  const handlePayment = async () => {
    // await writeContractAsync(simulateWastePayment?.request)
  

    const [account] =
      typeof window !== "undefined" && window.ethereum
        ? await window.ethereum.request({ method: "eth_requestAccounts" }) // Request accounts if in a browser with Ethereum provider
        : [];

    if (!account) {
      throw new Error("No account found. Please connect your wallet."); // Throw an error if no account is found
    }

    const walletClient = typeof window !== "undefined" && window.ethereum ? createWalletClient({
      account,
      chain: zkSyncSepoliaTestnet,
      transport: custom(window.ethereum)
  }).extend(eip712WalletActions()) : null;

    const response = await walletClient.writeContract({
      address: wasteInsure.address,
      abi: wasteInsure.abi,
      functionName: "wastePayment",
      args: [
        id, tokenInput
      ],
      account,
      paymaster: Generatepayment.address,
      paymasterInput: getGeneralPaymasterInput({
        innerInput: new Uint8Array(),
      }),
    });
    console.log(response, " result");
    toast.success("Waste Recorded");
   


  }
  

  // send wastepayment when the transfer bottun is clicked
  const payment = async () => {
    setLoading("Approving...");
    clear();

    try {
      
      // messages to display during the process of the payments
      await toast.promise(handlePayment(), {
        pending: "Awaiting Payment",
        success: "Successfully Transfer Payment To Hospital. Kindly Visit the Hospital for health checkup",
        error: "You must be wasset Admin before You Can make Payment or Insufficient funds"
      })
    } catch (e) {
      console.log({ e });
      setError(e?.reason || e?.message || "Something happen. Try again later")
    }
  };

  if (!waste) return null;

  // convert price from wei to cUSD
  const convertWasteAmount = ethers.formatEther(
    waste.wasteAmount.toString()
  )

  if (
    searchQuery != "" &&
    !waste.depositor
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase().trim())
  ) {
    return null;
  }
  

  return (
    <div className='max-w-md m-auto text-white bg-[#06102b] rounded-lg w-72 drop-shadow-2xl p-2'>
      
      {address == waste.wassetWasteAdmin ? (
        <>
          <div className=' pl-2'>
            <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
          </div>
          <div className='pl-2 text-center'>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Payment Status <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
            <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
            <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
          </div>
          <div className=' flex justify-center items-center flex-col'>
            {waste.isPaid? "Admin paid": <>
          <select className="select select-bordered w-full max-w-xs" onChange={(e) => {
                  setTokenInput(e.target.value);
                }}>
            <option disabled selected>Select the prefered payment</option>
            <option value=''>USDC</option>
            <option value=''>USDT</option>
            <option value='0xf333c5BA38A6a8C83877E0B7a99836F28219c0F6'>AMT</option>
          </select>
          
            <button className=' bg-white py-2 px-2 rounded-lg font-medium text-blue-700 hover:text-white hover:bg-[#efae07] mt-5 mb-5' onClick={payment}>Transfer Payment</button>
          </>}
          </div>
        </>
        ) : <>
            <div className=' pl-2'>
              <h1 className=' text-center'><span className='text-xl font-bold text-[#efae07]'>Collector Address</span><br/><span className=' text-sm'>{truuncateAddress(waste.producer)}</span></h1>
            </div>
            <div className='pl-2 text-center'>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Depositor Name <br /><span className=' text-white text-base'>{waste.depositor}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Waste Type <br /><span className=' text-white text-base'>{waste.wasteType}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-2'>Location Point <br /> <span className=' text-white text-sm'>{waste.collectionLocation}</span></p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Weight <br /> <span className=' text-white text-sm'>{waste.weight}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Payment Status <br /> <span className=' text-white text-sm'>{waste.isPaid? "Yes Paid" : "Not paid"}</span> </p>
              <p className=' text-[18px] text-[#efae07] font-medium pt-3'>Waste Amount <br /> <span className=' text-white text-sm'>$ {convertWasteAmount}</span></p>
              <p className=' text-[18px] font-medium p-1 text-[#efae07]'>Hopital Choice Address <span className=' text-white text-sm'>{truuncateAddress(waste.hospitalAdress)}</span></p>
            </div>
        </>
      }
    </div>
  )
}

export default WasteCard
