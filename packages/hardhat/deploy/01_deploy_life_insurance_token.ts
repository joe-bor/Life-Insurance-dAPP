import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLifeInsuranceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("LifeInsuranceToken", {
    from: deployer,
    log: true,
    autoMine: true,
    args: ["LifeInsuranceToken", "LIT"],
  });
};

export default deployLifeInsuranceToken;

deployLifeInsuranceToken.tags = ["LifeInsuranceToken"];
