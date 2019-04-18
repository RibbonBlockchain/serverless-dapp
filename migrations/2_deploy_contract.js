let RibbonIncentivesContract = require("../contracts/Ribbon.sol");

module.exports = function(deployer) {
    deployer.deploy(RibbonIncentivesContract);
};