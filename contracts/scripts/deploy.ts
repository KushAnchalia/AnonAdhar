import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";


async function main() {
  // Get the contract factory for AnonAadhaarVoting
  const AnonAadhaarVoting = await ethers.getContractFactory("AnonAadhaarVoting");
  
  // Define candidates
  const candidates = ["Candidate A", "Candidate B", "Candidate C"];
  
  // Get the Anon Aadhaar verifier address (you'll need to replace this)
  const verifierAddress = "0x..."; // Replace with actual verifier contract address
  
  // Deploy the contract
  const votingContract = await AnonAadhaarVoting.deploy(verifierAddress, candidates);
  
  // Wait for deployment
  await votingContract.deployed();
  
  console.log(`AnonAadhaarVoting deployed to: ${votingContract.address}`);
}

// Proper error handling for deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });