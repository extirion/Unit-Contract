const UnitLib = artifacts.require("Unit");

module.exports = function(deployer) {
  deployer.deploy(UnitLib, "UnitMinuteCoin", "UMC", 3, 10000000);
};
