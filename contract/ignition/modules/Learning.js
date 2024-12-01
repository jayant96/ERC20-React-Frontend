const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Learning", (m) => {

  const learning = m.contract("Learning", [m.getAccount(0)]);


  return { learning };
});