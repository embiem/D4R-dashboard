import { MetaFunction, useSubmit, useTransition } from "remix";
import { ActionFunction, json, useActionData } from "remix";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ethers } from "ethers";

import GridList from "~/components/GridList";
import AddressForm from "~/components/AddressForm";
import { useContext, useEffect, useState } from "react";
import invariant from "ts-invariant";
import { AddressContext } from "~/root";
import Card from "~/components/Card";

export let meta: MetaFunction = () => {
  return {
    title: "D4R Dashboard",
    description:
      "Here you can enter your Ethereum Address and check your D4R NFT collection.",
  };
};

const APIURL = "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

const ensToAddressQuery = `
  query($name: String) {
    domains(where: {name: $name}) {
      id
      name
      owner {
        id
      }
      resolvedAddress {
        id
      }
    }
  }
`;

const addressToEnsQuery = `
  query($address: String) {
    domains(where: {resolvedAddress: $address}){
      name
    }
  }
  
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export let action: ActionFunction = async ({ request, params }) => {
  //if (request.method !== "PUT") throw json("Bad Request", { status: 400 });

  let formData = await request.formData();
  console.log(await request.text());
  console.log(formData.entries());
  console.log(formData.values());
  const address = formData.get("address");

  if (!address) throw json("Missing address", { status: 400 });

  console.log(address);
  invariant(typeof address === "string");

  if (address.toLowerCase().endsWith(".eth")) {
    // try to resolve it
    try {
      const { data }: any = await client.query({
        query: gql(ensToAddressQuery),
        variables: {
          name: address,
        },
      });

      console.log(data);

      if (data.domains.length > 0) {
        return {
          address: data.domains[0].resolvedAddress.id,
          domain: data.domains[0].name,
        };
      } else {
        throw Error("Could not resolve .eth address.");
      }
    } catch (err: any) {
      throw json(err.toString(), { status: 400 });
    }
  }

  // validate that it's an existing Ethereum address
  if (ethers.utils.isAddress(address)) {
    try {
      // check if ENS domain exists
      const { data }: any = await client.query({
        query: gql(addressToEnsQuery),
        variables: {
          address: address.toLowerCase(),
        },
      });

      if (data.domains.length > 0) {
        return {
          address: address,
          domain: data.domains[0].name,
        };
      } else {
        throw Error("Could not resolve .eth address.");
      }
    } catch (err) {}

    // Otherwise return just address
    return {
      address: address,
      domain: null,
    };
  }

  throw json("Bad Request", { status: 400 });
};

export default function Index() {
  const { address, domain } = useActionData() || {};

  const transition = useTransition();

  const { currentAddress, setCurrentAddress, clearAddress } =
    useContext(AddressContext);

  // Update the chosen & verified address in context
  useEffect(() => {
    if (address && address !== currentAddress) {
      setCurrentAddress(address);
    }
  }, [address, setCurrentAddress]);

  console.log(transition.state);

  return (
    <div>
      <div className="mb-8">
        <Card>
          {!currentAddress && transition.state === "idle" && <AddressForm />}
          {currentAddress && (
            <div>
              <div className="flex items-center">
                <span>👋</span>
                <p className="ml-4">{domain || currentAddress}</p>
              </div>
              <button
                onClick={clearAddress}
                className="ml-9 mt-2 underline text-sm text-gray-600"
              >
                Clear locally stored address
              </button>
            </div>
          )}
        </Card>
      </div>

      <GridList />
    </div>
  );
}
