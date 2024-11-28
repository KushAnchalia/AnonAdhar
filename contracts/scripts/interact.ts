import { ethers } from "hardhat";

async function main() {
  // Get contract instance
  const contractAddress = "0x..."; // Replace with deployed contract address
  const AnonAadhaarVoting = await ethers.getContractFactory("AnonAadhaarVoting");
  const contract = AnonAadhaarVoting.attach(contractAddress);

  // Example interaction: Get candidate results
  const [candidates, votes] = await contract.getCandidateResults();
  
  console.log("Voting Results:");
  candidates.forEach((candidate, index) => {
    console.log(`${candidate}: ${votes[index]} votes`);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });