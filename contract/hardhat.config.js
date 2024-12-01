require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    base: {
      url: "https://base-sepolia.g.alchemy.com/v2/ME4Kui25U_cJpocwg03JEIu8o2LdD5ud",
      accounts: [process.env.BASE_PRIVATE_KEY],
    },
  },
};
