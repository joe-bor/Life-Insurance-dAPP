import { formatEther, parseEther } from "viem";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const TEST_ADDRESS = `${0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0}`;

/*
    Hooks for our smart contract 
    - https://docs.scaffoldeth.io/hooks/
    - other things returned by the hooks that can be useful:
        - isLoading
        - isError
        - status: "error" | "pending" | "success" (this can be used to simply the code, instead of manually picking isLoading, isError, etc.)
        - refetch

  */

// ------------- Read Hooks for Life Insurance Contract -------------
const {
  data: threshold,
  isLoading,
  status,
} = useScaffoldReadContract({ contractName: "LifeInsurance", functionName: "THRESHOLD" });

const { data: commissionRate } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "COMMISSION_RATE",
});

const { data: commissionCollectedTotal } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "commissionCollectedTotal",
});

const { data: purchaseRatio } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "purchaseRatio",
});

const { data: paymentTokenAddress } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "paymentToken",
});

const { data: investorTokenBalance } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "investorTokenBalance",
  args: [TEST_ADDRESS],
});

const { data: pendingWithdrawals } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "pendingWithdrawals",
  args: [TEST_ADDRESS],
});

const { data: policies } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "policies",
  args: [TEST_ADDRESS],
});

const { data: policyHolders } = useScaffoldReadContract({
  contractName: "LifeInsurance",
  functionName: "policyholders",
  args: [TEST_ADDRESS],
});

// ---- WRITE HOOKS for Life Insurance Contract ----
const { writeContractAsync: claim } = useScaffoldWriteContract("LifeInsurance");
claim({ functionName: "claim" });

const { writeContractAsync: claimCommission } = useScaffoldWriteContract("LifeInsurance");
claimCommission({ functionName: "claimCommission" });

// TODO: change args to be dynamic -> should come from an input in the frontend
const { writeContractAsync: createPolicy } = useScaffoldWriteContract("LifeInsurance");
createPolicy({
  functionName: "createPolicy",
  args: [
    TEST_ADDRESS, // wallet address of person trying to get covered
    1n, // coverage amount => will come from a form (dropdown)
    30n, // age => form
    false, // smoker => form
    150n, // weight => form
  ],
});

// TODO: change value to be dynamic -> should come from an input in the frontend
const { writeContractAsync: payPremium } = useScaffoldWriteContract("LifeInsurance");
payPremium({ functionName: "payPremium", args: [TEST_ADDRESS], value: 1n });

// TODO: change value to be dynamic -> should come from an input in the frontend
const { writeContractAsync: purchaseTokens } = useScaffoldWriteContract("LifeInsurance");
purchaseTokens({ functionName: "purchaseTokens", value: 1n });

// TODO: change args to be dynamic -> should come from an input in the frontend
const { writeContractAsync: returnTokens } = useScaffoldWriteContract("LifeInsurance");
returnTokens({ functionName: "returnTokens", args: [1n] });

const { writeContractAsync: terminatePolicy } = useScaffoldWriteContract("LifeInsurance");
terminatePolicy({ functionName: "terminatePolicy" });

// ------- Read Hooks for Token Contract ----------

// const { data: paymentTokenAddress } = useScaffoldReadContract({
//   contractName: "LifeInsurance",
//   functionName: "paymentToken",
// });

const { data: paymentTokenName } = useScaffoldReadContract({
  contractName: "LifeInsuranceToken",
  functionName: "name",
});

const { data: paymentTokenSymbol } = useScaffoldReadContract({
  contractName: "LifeInsuranceToken",
  functionName: "symbol",
});

const { data: paymentTokenTotalSupply } = useScaffoldReadContract({
  contractName: "LifeInsuranceToken",
  functionName: "totalSupply",
});

// TODO: change args to be dynamic, coming from the frontend
const { data: addressTokenBalance } = useScaffoldReadContract({
  contractName: "LifeInsuranceToken",
  functionName: "balanceOf",
  args: [TEST_ADDRESS],
});

// ----- Write Hooks for Payment Token ----
const { writeContractAsync: grantMyselfMinterRole } = useScaffoldWriteContract("LifeInsuranceToken");
grantMyselfMinterRole({ functionName: "grantMyselfMinterRole" });
