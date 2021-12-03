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

export default function Privacy() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Privacy Notice</h1>
      <div className="my-8 text-blue-600">
        <Card>
          <div className="flex items-center">
            <InformationCircleIcon className="w-8" />
            <p className="ml-4">
              This website doesn't store any of your data on its servers. When
              you enter an address or .ens domain, this website uses a 🍪 to
              store the value for subsequent requests.
            </p>
          </div>
        </Card>
      </div>
      <Outlet />
    </div>
  );
}
