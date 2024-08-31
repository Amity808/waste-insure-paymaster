import { deployContract } from "./utils";


export default async function () {
    const contractArtifactName = "WasteInsured";
    // const constructorArguments = ["0x0000000000000000000000000000000000000000"];
    await deployContract(contractArtifactName);
}

// Starting deployment process of "WasteInsured"...
// Estimated deployment cost: 0.0256123687 ETH

// "WasteInsured" was successfully deployed:
//  - Contract address: 0x657d52c225Dfc9D6dDda3deE0f8E8fe3d8a7F7BA
//  - Contract source: contracts/WasteInsured/WasteInsured.sol:WasteInsured
//  - Encoded constructor arguments: 0x

// Requesting contract verification...
// Your verification ID is: 24393