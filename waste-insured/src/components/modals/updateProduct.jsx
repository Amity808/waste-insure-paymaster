import React from "react";
import useLoading from "@/hooks/useLoading";
import { IoCloseCircle } from "react-icons/io5";
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi";
import { walletClient, publicClient } from "@/helper/wagmiconfig";
import { toast } from "react-toastify";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from "wagmi";
const UpdateProduct = () => {
  const [toggle, setToggle] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const paymaster = "0x7afF0B53fe17231195968869c39B1D33599eDaB1";
  return <div></div>;
};

export default UpdateProduct;
