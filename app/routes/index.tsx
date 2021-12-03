import { redirect } from "remix";

export function loader() {
  return redirect(`/tools`);
}

// This is where a landing page could go
