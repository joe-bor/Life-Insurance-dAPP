"use client";

import { useState } from "react";
import type { NextComponentType } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const RegisterCoverage: NextComponentType = () => {
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [selectedValue, setSelectedValue] = useState("");
  const [coverage, setCoverage] = useState("");
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: createPolicy } = useScaffoldWriteContract("LifeInsurance");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    await createPolicy({
      functionName: "createPolicy",
      args: [
        connectedAddress, // wallet address of person trying to get covered
        BigInt(coverage), // coverage amount => will come from a form (dropdown)
        BigInt(age),
        Boolean(selectedValue),
        BigInt(weight),
      ],
    });

    setFullName("");
    setWeight("");
    setSelectedValue("");
    setCoverage("");
  };

  return (
    <div className=" m-4 p-4 border-2 rounded-box border-gray-500 ">
      <div className="flex flex-col gap-2">
        <div>
          <p className="my-0 ml-3">Name</p>
          <InputBase name="fullName" placeholder="Enter full name" value={fullName} onChange={setFullName} />
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <p className="my-0 ml-3">Age</p>
            <InputBase name="age" placeholder="Enter age" value={age} onChange={setAge} />
          </div>
          <div>
            <p className="my-0 ml-3">Weight (lbs)</p>
            <InputBase name="weight" placeholder="Enter weight" value={weight} onChange={setWeight} />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-0 ml-3">Are you a Tobacco User?</p>
          <select
            className={`bg-transparent border border-black text-gray-400 text-opacity-100 rounded-full min-h-9 px-4 ${
              selectedValue === "" ? "text-accent/50" : ""
            }`}
            value={selectedValue}
            onChange={e => setSelectedValue(e.target.value)}
          >
            <option value="">Select an Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="my-0 ml-3">Choose coverage</p>
          <select
            className={`bg-transparent border border-black text-gray-400 text-opacity-100 rounded-full min-h-9 px-4 ${
              coverage === "" ? "text-accent/50" : ""
            }`}
            value={coverage}
            onChange={e => setCoverage(e.target.value)}
          >
            <option value="1000000">Bronze</option>
            <option value="1000000000">Silver</option>
            <option value="1000000000000">Gold</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleSubmit}
        >
          Create Policy
        </button>
      </div>
    </div>
  );
};
export default RegisterCoverage;
