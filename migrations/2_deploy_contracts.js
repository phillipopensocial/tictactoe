var SimpleStorage = artifacts.require("./SimpleStorage.sol");
//var Tictactoe = artifacts.require("./Tictactoe.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  //deployer.deploy(Tictactoe);
};
