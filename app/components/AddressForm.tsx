import { Form, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";
import { UsersIcon, SearchIcon } from "@heroicons/react/outline";
import queryString from "query-string";

declare let window: any;

export default function AddressForm() {
  const [enterManually, setEnterManually] = useState(false);

  let submit = useSubmit();

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      submit(
        { address: accounts[0] },
        {
          action: "/tools?index",
          method: "post",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`${!enterManually && "hidden"}`}>
        <Form method="post">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Manually enter address
            </label>
            <div className="mt-1 inline-flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UsersIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                  placeholder=".eth or 0x"
                />
              </div>
              <button
                onClick={(e) => {
                  //onAddressChange(accounts[0])
                  console.log(e.currentTarget);
                }}
                type="submit"
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </Form>

        <button
          onClick={() => {
            setEnterManually(false);
            connectWalletAction();
          }}
          className="ml-4 underline text-lg text-gray-600"
        >
          Or connect wallet
        </button>
      </div>

      <div className={`${enterManually && "hidden"}`}>
        <button
          className="p-4 rounded-md text-indigo-900 font-bold bg-gradient-to-tr from-indigo-400 via-blue-400 to-sky-400"
          onClick={connectWalletAction}
        >
          Connect Wallet To Get Started
        </button>
        <button
          onClick={() => setEnterManually(true)}
          className="ml-4 underline text-lg text-gray-600"
        >
          Or enter address manually
        </button>
      </div>
    </>
  );
}
