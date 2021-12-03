import {
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { ActionFunction, json, useActionData, useNavigate } from "remix";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ethers } from "ethers";
import Cookies from "js-cookie";

import GridList from "~/components/GridList";
import AddressForm from "~/components/AddressForm";
import { useContext, useEffect, useState } from "react";
import invariant from "ts-invariant";
import { AddressContext } from "~/root";
import Card from "~/components/Card";
import { userAddress } from "~/cookies";

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

  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userAddress.parse(cookieHeader)) || {};

  const address = formData.get("address");

  if (!address) throw json("Missing address", { status: 400 });

  console.log(address);
  invariant(typeof address === "string");

  let returnVal = {
    address: address,
    domain: null,
  };

  if (address.toLowerCase().endsWith(".eth")) {
    // try to resolve it
    try {
      const { data }: any = await client.query({
        query: gql(ensToAddressQuery),
        variables: {
          name: address,
        },
      });

      if (data.domains.length > 0) {
        returnVal = {
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
  else if (ethers.utils.isAddress(address)) {
    try {
      // check if ENS domain exists
      const { data }: any = await client.query({
        query: gql(addressToEnsQuery),
        variables: {
          address: address.toLowerCase(),
        },
      });

      if (data.domains.length > 0) {
        returnVal = {
          address: address,
          domain: data.domains[0].name,
        };
      } else {
        throw Error("Could not resolve .eth address.");
      }
    } catch (err) {}
  } else {
    throw json("Bad Request", { status: 400 });
  }

  // Otherwise return just address
  cookie.address = returnVal.address;
  cookie.domain = returnVal.domain;

  return json(returnVal, {
    headers: {
      "Set-Cookie": await userAddress.serialize(cookie),
    },
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userAddress.parse(cookieHeader)) || {};
  return { address: cookie.address, domain: cookie.domain };
};

export default function Index() {
  const navigate = useNavigate();
  const loadedData = useLoaderData();
  const actionData = useActionData() || {};

  const { address = "", domain = "" } = { ...loadedData, ...actionData };

  console.log(address, domain);

  return (
    <div>
      <div className="mb-8">
        <Card>
          {!address && <AddressForm />}
          {address && (
            <div>
              <div className="flex items-center">
                <span>👋</span>
                <p className="ml-4">{domain || address}</p>
              </div>
              <button
                onClick={async () => {
                  Cookies.remove("user-address");
                  navigate(0);
                }}
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
