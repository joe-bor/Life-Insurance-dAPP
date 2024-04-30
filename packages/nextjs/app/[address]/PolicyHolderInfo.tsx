import { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

const PolicyHolderInfo: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: policies } = useScaffoldReadContract({
    contractName: "LifeInsurance",
    functionName: "policies",
    args: [connectedAddress],
  });

  const { data: policyHolders } = useScaffoldReadContract({
    contractName: "LifeInsurance",
    functionName: "policyholders",
    args: [connectedAddress],
  });
  /*
  	struct Policy {
		uint256 coverageAmount;
		uint256 monthlyPremium;
		uint256 dueDate; // UNIX timestamp of next due date
		uint256 lateFee; // Amount added to the premium if it is paid after the due date
		uint256 endDate;
		bool isActive;
	}

	struct PolicyholderInfo {
		uint age;
		bool smoker;
		uint weight;
	}
   */
  const transformPolicyHolders = (policyHoldersData: any[] | readonly [bigint, boolean, bigint] | undefined) => {
    // Check if data is undefined before processing
    if (!policyHoldersData) return undefined;

    return {
      age: Number(policyHoldersData[0]), // Convert bigint to number
      smoker: policyHoldersData[1], // Boolean value, no need to convert
      weight: Number(policyHoldersData[2]), // Convert bigint to number
    };
  };

  // Assuming `policyHolders` is fetched from the hook
  const transformedPolicyHolders = transformPolicyHolders(policyHolders);

  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                {connectedAddress && (
                  <BlockieAvatar
                    address={connectedAddress}
                    size={(blockieSizeMap["base"] * 24) / blockieSizeMap["base"]}
                  />
                )}
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>

          <div className="stat-value m-2">Policy Holder Info</div>
          <div className="flex flex-row justify-around items-center m-2">
            <div className="stat-title">{transformedPolicyHolders?.age} yrs old</div>
            <div className="stat-title">{transformedPolicyHolders?.weight} lbs</div>
            {transformedPolicyHolders?.smoker ? (
              <div className="stat-desc text-secondary">Smoker</div>
            ) : (
              <div className="stat-desc text-secondary">Non-smoker</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default PolicyHolderInfo;
