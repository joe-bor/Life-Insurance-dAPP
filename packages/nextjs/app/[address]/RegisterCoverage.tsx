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
          Create Policy
        </button>
      </div>
    </div>
  );
};
export default RegisterCoverage;
