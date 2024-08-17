import SideBar from "@/components/SideBar"
import WasteList from "@/components/ListCards/WasteList"
import Data from "@/components/Data"
 export default function Dashboard() {
  return (
    <div className="pt-4 py-8">
      <SideBar />
      <div className=" ml-60 text-2xl py-10  max-sm:ml-0 max-md:ml-0">
        <div>
          <WasteList />
          <Data />
        </div>
      </div>
    </div>
  )
}