import { useEffect, useRef } from "react";
import {
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useLocation,
} from "remix";
import RealisticConfetti from "~/components/RealisticConfetti";

const snapshot = require("../../../../public/snapshot_lowercased.json");

export let meta: MetaFunction = () => {
  return {
    title: "D4R Dashboard",
    description:
      "Here you can enter your Ethereum Address and check your D4R NFT collection.",
  };
};

export let loader: LoaderFunction = async ({ params }) => {
  let address = params.address;

  if (typeof address === "string") {
    address = address.toLowerCase();

    if (snapshot.indexOf(address) !== -1) {
      return true;
    }
    return false;
  }

  throw json("Invalid address", { status: 400 });
};

export default function AirdropAddress() {
  const isInAirdrop = useLoaderData();
  const location = useLocation();

  // This will store the fire trigger function as ref once passed as prop
  const obj = {
    fire: () => {},
  };

  const timeoutRef = useRef<any>();
  useEffect(() => {
    if (isInAirdrop && !timeoutRef.current) {
      timeoutRef.current = setTimeout(obj.fire, 500);

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isInAirdrop]);

  return (
    <div>
      <RealisticConfetti fireRef={obj} />

      {isInAirdrop && <p>Congrats, you're in!</p>}
      {!isInAirdrop && (
        <p>
          Sorry, but "
          {location.pathname.substr(location.pathname.lastIndexOf("/") + 1)}" is
          not in the{" "}
          <a
            href="https://github.com/Developer-DAO/erc721-snapshot/blob/main/snapshot.json"
            className="underline text-blue-700"
          >
            snapshot
          </a>
          !
        </p>
      )}
    </div>
  );
}
