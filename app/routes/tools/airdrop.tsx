import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "D4R Dashboard",
    description:
      "Here you can enter your Ethereum Address and check your D4R NFT collection.",
  };
};

export default function Index() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Airdrop</h2>
    </div>
  );
}
