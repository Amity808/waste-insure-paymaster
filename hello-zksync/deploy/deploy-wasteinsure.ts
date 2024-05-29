import { deployContract } from "./utils";


export default async function () {
    const contractArtifactName = "WasteInsured";
    // const constructorArguments = ["0x0000000000000000000000000000000000000000"];
    await deployContract(contractArtifactName);
}

// "GeneralPaymaster" was successfully deployed:
//  - Contract address: 0x7afF0B53fe17231195968869c39B1D33599eDaB1
//  - Contract source: contracts/paymasters/GeneralPaymaster.sol:GeneralPaymaster
//  - Encoded constructor arguments: 0x
