import { useState } from "react";

export function UserBadge(): JSX.Element {
  const [userStatus, setUserStatus] = useState("");

  fetchUserStatus().then(setUserStatus);

  if (userStatus === "") {
    return <div>Loading...</div>;
  }

  return <div>{userStatus}</div>;
}

async function fetchUserStatus(): Promise<string> {
  await sleep(200);
  return "Active";
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
