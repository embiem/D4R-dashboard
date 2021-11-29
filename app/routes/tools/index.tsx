import type { MetaFunction } from "remix";
import { Outlet } from "remix";
import { InformationCircleIcon } from "@heroicons/react/outline";

import GridList from "~/components/GridList";

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
      <GridList />
    </div>
  );
}
