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
    <div className="remix__page">
      <main>
        <h2>Welcome to D4R Dashboard!</h2>
        <p>
          Here you can enter your Ethereum Address and check your D4R NFT
          collection.
        </p>
        <p>
          Currently it's interesting to know whether you're eligible for the
          upcoming airdrop of Developer DAO's ERC20 govenance token. This app
          will let you know.
        </p>
      </main>
      <aside>
        <h2>Enter Address</h2>
        <input type="text" placeholder="sha.eth or 0xY0urAdR3ss...sS" />

        <button>Get Address from Wallet</button>
      </aside>
    </div>
  );
}
