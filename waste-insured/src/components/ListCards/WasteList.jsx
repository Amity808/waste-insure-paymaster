'use client'
import React, {useState} from 'react'
import WasteCard from '@/components/Cards/WasteCard'
import WasteFilter from '../WasteFilter'
import { useReadContract } from 'wagmi';
import { wasteInsure } from '@/abi/wasteInsured';

const WasteList = () => {

  // to get the length of waste store 

  const { data: data } = useReadContract({
    abi: wasteInsure.abi,
    address: wasteInsure.address,
    functionName: "getWasteLength",
    args: [],
  });

  // convert data to number
  const wasteLength = data? Number(data.toString()) : 0;

  console.log(data, "wasteLength")

  // states of the errors
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [searchQuery, setSearchQuery] = useState("")


  const clearmessage = () => {
    setError('');
    setSuccess('');
    setLoading('');
  }

  // handle serach through the waste data through their name

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const getWasteLength = () => {
    // if there is no waste recorded, return null 
    if(!wasteLength) return null;
    const depositWaste = [];
    // looping through the data
    for (let i = 0; i < wasteLength; i++) {
      depositWaste.push(
        <WasteCard 
          key={i}
          id={i}
          setError={setError}
          setLoading={setLoading}
          setSuccess={setSuccess}
          clear={clearmessage}
          searchQuery={searchQuery}
          />
          )
    }
    return depositWaste;
  }
  
  return (
    <div>
      <WasteFilter onSearch={handleSearch} />
      {/* {error && <ErrorAlert message={error} clear={clearmessage} />}
      {success && <OnSuccessAlert message={success} />}
      {loading && <LoadingAlert message={loading} />} */}
        <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {getWasteLength()}
          </div>
      </div>
    </div>
  )
}

export default WasteList

// mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8