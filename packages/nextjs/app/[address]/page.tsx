"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PolicyHolderInfo from "./PolicyHolderInfo";
import RegisterCoverage from "./RegisterCoverage";
import { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useBalance, useReadContract } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const page: NextPage = () => {
  const params = useParams<{ address: string }>();
  const [insuranceAddress, setInsuranceAddress] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isInsuring, setIsInsuring] = useState(false);

  const {
    data: threshold,
    isLoading: isLoadingThreshold,
    status,
  } = useScaffoldReadContract({ contractName: "LifeInsurance", functionName: "THRESHOLD" });

  const { data: paymentTokenName } = useScaffoldReadContract({
    contractName: "LifeInsuranceToken",
    functionName: "name",
  });

  const { data: paymentTokenAddress } = useScaffoldReadContract({
    contractName: "LifeInsurance",
    functionName: "paymentToken",
  });

  const { data: paymentTokenSymbol } = useScaffoldReadContract({
    contractName: "LifeInsuranceToken",
    functionName: "symbol",
  });

  const { data: totalSupply, refetch } = useReadContract({
    address: paymentTokenAddress,
    functionName: "totalSupply",
    abi: [
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  });

  const { writeContractAsync: purchaseTokens, isMining, isPending } = useScaffoldWriteContract("LifeInsurance");

  const {
    data: balance,
    isError,
    isLoading,
    queryKey,
  } = useBalance({
    address: insuranceAddress,
  });

  useEffect(() => {
    setInsuranceAddress(params.address);
  }, []);

  useEffect(() => {
    if (balance && threshold) {
      if (balance.value >= threshold) {
        setIsInsuring(true);
      }
    }
  }, [balance]);

  useEffect(() => {
    const refetchSupply = async () => {
      await refetch();
    };

    try {
      refetchSupply();
    } catch (error) {
      console.error(error);
    }
  }, [totalSupply, balance]);

  const handleBuyClick = async () => {
    try {
      await purchaseTokens({ functionName: "purchaseTokens", value: parseEther(inputValue) });
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-10 m-4">
      <div className="stats shadow m-6">
        <div className="stat place-items-center">
          <div className="stat-title text-3xl">Insurance Contract Address</div>
          <Address address={insuranceAddress} format="short" size="sm" />
          {/* <div className="stat-value">31K</div>
          <div className="stat-desc">From January 1st to February 1st</div> */}
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Phase</div>
          {threshold && balance?.value! >= threshold ? (
            <div className="stat-value text-secondary">Insuring</div>
          ) : (
            <div className="stat-value text-secondary">Funding</div>
          )}
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Balance</div>
          <Balance address={insuranceAddress} className="stat-value text-secondary" />
        </div>
      </div>

      <div className="flex w-8/12 m-4 ">
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="text-2xl">Token Address</div>
          <Address address={paymentTokenAddress || ""} format="short" size="xs" />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="text-2xl">Token Name</div>
          <div>{paymentTokenName}</div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="text-2xl">Token Symbol</div>
          <div>{paymentTokenSymbol}</div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <div className="text-2xl font-medium">Supply</div>
          {totalSupply ? <div> {formatEther(totalSupply)} </div> : <div>0</div>}
        </div>
      </div>

      {/* This should be dynamically rendered, depends whether is it Funding or Investing phase*/}
      {/* ---- Funding --- */}
      {isInsuring ? (
        <RegisterCoverage />
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title self-center">Buy Tokens!</h2>
            <p>Invest in this contract and secure a steady commission from premium collections by insurers.</p>
            <div className="card-actions justify-center align-center">
              <input
                type="number"
                placeholder="Amount in ETH"
                className="input input-bordered input-sm w-full max-w-xs"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="btn btn-block" onClick={handleBuyClick} disabled={isMining || isPending}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- Investing ---  */}
      {/* ----> Replace w/ Form to buy coverage <---  */}

      <PolicyHolderInfo />
    </div>
  );
};
export default page;
