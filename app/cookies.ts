import { createCookie } from "remix";

export const userAddress = createCookie("user-address", {
  maxAge: 60 * 60 * 24 * 7, // one week
});
