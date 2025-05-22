const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  console.log("✅ Got contract factory");

  const myContract = await MyContract.deploy();
  console.log("✅ Deploy tx sent");

  await myContract.waitForDeployment();

  const address = await myContract.getAddress();
  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error("❌ Error deploying contract:", error);
  process.exitCode = 1;
});
