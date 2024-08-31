import React from 'react'
import { ethers } from 'ethers'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { useReadContract } from 'wagmi'
import { useEffect, useState } from 'react'
import { truuncateAddress } from '@/utils/index';
import { wasteInsure } from '@/abi/wasteInsured'
import { getWallet } from '@/utils/getwallet'
import { utils, BrowserProvider } from 'zksync-ethers'
import { Generatepayment } from '@/abi/GeneralPayment'

const TokenCard = () => {

    const { address } = useAccount();

    const { data: getWasteInfo } = useReadContract({
        abi: wasteInsure.abi,
        address: wasteInsure.address,
        functionName: "getWasteInfo",
        args: [id],
      })

  return (
    <div>
      
    </div>
  )
}

export default TokenCard
