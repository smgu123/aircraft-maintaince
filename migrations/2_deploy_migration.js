const Migrations = artifacts.require("Aircraft");

module.exports = function(deployer) {
deployer.deploy(Migrations);
};