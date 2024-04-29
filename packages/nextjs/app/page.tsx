"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
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
              Create Policy
            </button>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* <!-- Bronze Plan --> */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Bronze</h3>
                <p className="mt-4 text-gray-400">Get started with our basic coverage.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$0</span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>single coverage</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>sample perk</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic support</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Sign Up
              </a>
            </div>

            {/* <!-- Silver Plan --> */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Silver</h3>
                <p className="mt-4 text-gray-400">Perfect for families.</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$49</span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Coverage for 4 people</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>sample perk</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Standard support</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Get Started
              </a>
            </div>

            {/* <!-- Gold Plan --> */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Gold</h3>
                <p className="mt-4 text-gray-400">Ideal for complex scenarios</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-xl font-medium text-gray-400">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited coverage for the entire bloodline</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited transactions</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <a
                href="#"
                className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
