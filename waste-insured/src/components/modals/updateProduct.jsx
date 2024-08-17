import React from "react";
import useLoading from "@/hooks/useLoading";
import { IoCloseCircle } from "react-icons/io5";
import { wasteMarkeplace } from "@/abi/wastemarketplaceAbi";
import { walletClient, publicClient } from "@/helper/wagmiconfig";
import { toast } from "react-toastify";
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from "wagmi";
const UpdateProduct = ({ id }) => {
  const [toggle, setToggle] = useState(false);
  const [toggele, setToggele] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");

  const clearInPut = () => {
    setUpdateQuantity("");
    setUpdatePrice("");
  };
  const { isLoading, startLoading, stopLoading } = useLoading();
  const paymaster = "0x7afF0B53fe17231195968869c39B1D33599eDaB1";
  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div>
        {/* Update Product Button that opens the modal */}
        <button
          type="button"
          onClick={() => setToggele(true)}
          className="inline-block ml-12 mt-6 px-6 py-2.5 bg-black text-white font-medium text-md leading-tight rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          Update Product
        </button>

        {/* Modal */}
        {toggele && (
          <div
            className="fixed z-40 overflow-y-auto top-0 w-full left-0"
            id="modal"
          >
            {/* Form with input fields for the product, that triggers the update Product function on submit */}
            <form>
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  {/* Input fields for the product */}
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label>Update Product Price (cUSD)</label>
                    <input
                      onChange={(e) => {
                        setUpdatePrice(e.target.value);
                      }}
                      required
                      type="number"
                      className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    />
                    <label>Update Product Quantity (units)</label>
                    <input
                      onChange={(e) => {
                        setUpdateQuantity(e.target.value);
                      }}
                      required
                      type="number"
                      className="w-full bg-gray-100 p-2 mt-2 mb-3"
                    />
                  </div>
                  {/* Button to close the modal */}
                  <div className="bg-gray-200 px-4 py-3 text-right">
                    <button
                      type="button"
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                      onClick={() => setToggele(false)}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    {/* Button to update the product to the marketplace */}
                    <button
                      type="submit"
                      disabled={!!isLoading || !isFormFilled}
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    >
                      {isLoading ? isLoading : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
