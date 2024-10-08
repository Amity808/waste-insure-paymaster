import React, { useCallback, useState, useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { truuncateAddress } from "../../utils";
import { FaCopy } from "react-icons/fa";
import { useReadContract } from "wagmi";
import { wasteInsure } from "@/abi/wasteInsured";
const HospitalCard = ({ id, setError, setLoading, clear, searchQuery }) => {
  const { address } = useAccount();
 
  const { data: getHospitalInfo } = useReadContract({
    abi: wasteInsure.abi,
    address: wasteInsure.address,
    functionName: "getHospitalInfo",
    args: [id],
  })

  console.log(getHospitalInfo, "getHospitalInfo");
  
  const [hospital, setHospital] = useState(null);
  const [copyAddress, setCopyAddress] = useState('')

  const { openConnectModal } = useConnectModal();

  const gethospitalData = useCallback(() => {
    if (!getHospitalInfo) return null;

    setHospital({
      name: getHospitalInfo[0],
      imagehos: getHospitalInfo[1],
      locationBar: getHospitalInfo[2],
      hospitalType: getHospitalInfo[3],
      walletAddress: getHospitalInfo[4],
    });
  }, [getHospitalInfo]);

  useEffect(() => {
    gethospitalData();
  }, [gethospitalData]);

  if (!hospital) return null;

  const handleCopy = (copyAdd) => {
    setCopyAddress(copyAdd);
    navigator.clipboard.writeText(`${copyAdd}`);
    toast.success(`Address copied ${hospital.walletAddress}`)

  }

  if (searchQuery != "" && !hospital.name.toLocaleLowerCase()
    .includes(searchQuery.toLocaleLowerCase().trim())){
      return null;
    }
  return (
    <div className=" w-96 bg-[#EFAE07] text-base font-semibold rounded-xl">
      <img src={hospital.imagehos} alt="" className=" w-full" />
      <div className=" flex flex-col items-center justify-center pt-3">
        <div className=" flex flex-row gap-8 text-center">
          <span>
            <p className=" rounded-md border-1 border cursor-pointer bg-white">
              Name
            </p>
            <p className="pt-2">{hospital.name}</p>
          </span>
          <span>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Location
            </p>
            <p  className="pt-2">{hospital.locationBar}</p>
          </span>
        </div>
        <div className=" text-center mt-4 flex flex-row gap-9 pb-5">
          <div>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Hospital
            </p>
            <p  className="pt-2">{hospital.hospitalType}</p>
          </div>
          <div>
            <p className="rounded-md border-1 border cursor-pointer bg-white">
              Address
            </p>
            <span  className=" cursor-pointer flex flex-row justify-center items-center pt-2" onClick={() => handleCopy(hospital.walletAddress)}>
            <FaCopy width={24} height={24} />
            <p>
              {truuncateAddress(hospital.walletAddress)}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
