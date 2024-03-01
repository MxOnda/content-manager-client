"use server";

import { cookies } from "next/headers";

export async function signinAction(values: { token: string; currentUser: any }) {
  cookies().set("access-token", JSON.stringify(values));

  return true;
}
