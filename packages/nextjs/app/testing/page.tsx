"use client";

import { formatEther, parseEther } from "viem";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

async function TestComponent() {
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

  // ------------- INSURANCE  READS -------------
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

  // ---- WRITE HOOKS ----
  const { writeContractAsync: claim } = useScaffoldWriteContract("LifeInsurance");
  await claim({ functionName: "claim" });

  const { writeContractAsync: claimCommission } = useScaffoldWriteContract("LifeInsurance");
  await claimCommission({ functionName: "claimCommission" });

  // TODO: change args to be dynamic -> should come from an input in the frontend
  const { writeContractAsync: createPolicy } = useScaffoldWriteContract("LifeInsurance");
  await createPolicy({
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
  await payPremium({ functionName: "payPremium", args: [TEST_ADDRESS], value: 1n });

  // TODO: change value to be dynamic -> should come from an input in the frontend
  const { writeContractAsync: purchaseTokens } = useScaffoldWriteContract("LifeInsurance");
  await purchaseTokens({ functionName: "purchaseTokens", value: 1n });

  // TODO: change args to be dynamic -> should come from an input in the frontend
  const { writeContractAsync: returnTokens } = useScaffoldWriteContract("LifeInsurance");
  await returnTokens({ functionName: "returnTokens", args: [1n] });

  const { writeContractAsync: terminatePolicy } = useScaffoldWriteContract("LifeInsurance");
  await terminatePolicy({ functionName: "terminatePolicy" });
  // --------------------------------

  if (isLoading) return <p>Loading...</p>;
  if (threshold) return <p>Threshold: {formatEther(threshold)}</p>;
}
export default TestComponent;
