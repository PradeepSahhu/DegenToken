const hre = require("hardhat");
require("dotenv").config();
async function main() {
  // Get the Points smart contract
  const Degen = await hre.ethers.getContractFactory("DegenERC20");

  // Deploy it
  const degen = await Degen.deploy(10, 10);
  // await degen.deployed();
  await degen.waitForDeployment();

  // Display the contract address
  console.log(`Degen token deployed to ${await degen.getAddress()}`);

  const addressOfContract = await degen.getAddress();

  if (
    hre.network.config.chainId === 11155111 &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // await degen.deployTransaction.wait(3); // waiting for three blocks to be added after that i will initiate verify function.
    await degen.waitForDeployment(3);
    await verify(addressOfContract, [100, 10]);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract....");

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      contructorArguments: [100, 10],
    });

    console.log("Contract is verified");
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified");
    } else {
      console.log(e);
    }
  }
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
