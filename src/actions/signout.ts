"use server";

import { cookies } from "next/headers";

export async function signoutAction() {
  cookies().delete("access-token");

  return true;
}
