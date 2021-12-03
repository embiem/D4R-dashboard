import { MetaFunction, Outlet, useLoaderData, useNavigate } from "remix";
import { useContext, useEffect } from "react";
import { AddressContext } from "~/root";

export let meta: MetaFunction = () => {
  return {
    title: "D4R Dashboard",
    description:
      "Here you can enter your Ethereum Address and check your D4R NFT collection.",
  };
};

export default function Airdrop() {
  const { currentAddress } = useContext(AddressContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (currentAddress) navigate(`${currentAddress}`);
  }, [currentAddress]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Airdrop</h2>
      {!currentAddress && (
        <p>
          If we have address, redirect to $address, otherwise show the
          AddressForm
        </p>
      )}
      <Outlet />
    </div>
  );
}
