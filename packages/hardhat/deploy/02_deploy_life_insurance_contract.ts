import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLifeInsurance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("LifeInsurance", {
    from: deployer,
    log: true,
    autoMine: true,
    args: ["LifeInsurance", "LIT", 1n, "0x199839a4907ABeC8240D119B606C98c405Bb0B33"],
  });
};

export default deployLifeInsurance;

deployLifeInsurance.tags = ["LifeInsurance"];
