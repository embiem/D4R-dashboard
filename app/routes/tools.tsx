import type { MetaFunction } from "remix";
import { Outlet } from "remix";
import { InformationCircleIcon } from "@heroicons/react/outline";

import Card from "~/components/Card";

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
      <h1 className="text-2xl font-semibold text-gray-900">
        Genesis NFT & Developer DAO Tools
      </h1>
      <div className="my-8 text-blue-600">
        <Card>
          <div className="flex items-center">
            <InformationCircleIcon className="w-8" />
            <p className="ml-4">
              This website contains a collection of tools for{" "}
              <a
                href="https://opensea.io/collection/devs-for-revolution"
                className="underline text-blue-700"
              >
                D4R NFT
              </a>{" "}
              hodlers &{" "}
              <a
                href="https://www.developerdao.com/"
                className="underline text-blue-700"
              >
                Developer DAO
              </a>{" "}
              members.
            </p>
          </div>
        </Card>
      </div>
      <Outlet />
    </div>
  );
}
