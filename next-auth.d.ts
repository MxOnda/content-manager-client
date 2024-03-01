import { User as DefaultUser } from "next-auth";

import "next-auth/jwt";

export type CurrentUserType = {
  sub: string;
  fullname: string;
  email: string;
  role: string;
  token: string;
};

declare module "next-auth" {
  interface Session {
    user: CurrentUserType;
  }

  interface User extends CurrentUserType {}
}

declare module "@auth/core/jwt" {
  interface JWT extends CurrentUserType {}
}
