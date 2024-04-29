"use client";

import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useBalance } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const page: NextPage = () => {
  const params = useParams<{ address: string }>();
  const [insuranceAddress, setInsuranceAddress] = useState("");
  const [inputValue, setInputValue] = useState("");

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

  const { data: paymentTokenTotalSupply } = useScaffoldReadContract({
    contractName: "LifeInsuranceToken",
    functionName: "totalSupply",
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
    if (insuranceAddress) {
      try {
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

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
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title text-3xl">Insurance Contract Address</div>
          <Address address={insuranceAddress} format="long" size="sm" />
          {/* <div className="stat-value">31K</div>
          <div className="stat-desc">From January 1st to February 1st</div> */}
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Phase</div>
          {balance?.value! > parseEther("1") ? (
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
          <div>{formatEther(paymentTokenTotalSupply || 0n)}</div>
        </div>
      </div>

      {/* This should be dynamically rendered, depends whether is it Funding or Investing phase*/}
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
    </div>
  );
};
export default page;
