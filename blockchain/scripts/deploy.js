const hre = require("hardhat");

async function main() {
  const TradeToken = await hre.ethers.getContractFactory("TradeToken");
  const tradeToken = await TradeToken.deploy();
  await tradeToken.waitForDeployment();

  console.log("✅ TradeToken deployed to:", tradeToken.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
