"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, InputBase } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [selectedValue, setSelectedValue] = useState("");
  const [salary, setSalary] = useState<number | "">("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      fullName,
      age: Number(age) || null,
      weight: Number(weight) || null,
      selectedValue,
      salary: Number(salary) || null,
    };

    console.log("this is the data:", formData);

    // try {
    //   const response = await fetch("", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const result = await response.json();
    //   console.log("Success:", result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Solidity Insurance</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

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
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <p className="my-0 ml-3">Annual Salary</p>
              <InputBase name="salary" placeholder="Enter annual salary" value={salary} onChange={setSalary} />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
