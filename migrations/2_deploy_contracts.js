const UnitLib = artifacts.require("Unit");

module.exports = function(deployer) {
  deployer.deploy(UnitLib);
};
