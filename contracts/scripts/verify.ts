import { run } from "hardhat";

async function verify(contractAddress: string, args: any[]) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("Already Verified")) {
      console.log("Contract already verified!");
    } else {
      console.error(e);
    }
  }
}

async function main() {
  const contractAddress = "0x..."; // Replace with deployed contract address
  const verifierAddress = "0x..."; // Verifier address
  const candidates = ["Candidate A", "Candidate B", "Candidate C"];
  
  await verify(contractAddress, [verifierAddress, candidates]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });