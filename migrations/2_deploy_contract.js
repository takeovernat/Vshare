const Vshare = artifacts.require("Vshare");

module.exports = function(deployer) {
	deployer.deploy(Vshare);
}