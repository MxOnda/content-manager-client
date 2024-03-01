import React, { useEffect, useState } from "react";

export type CurrentUser = {
  id: string;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const useAuthentication = () => {
  const [isAuth, setIsAuth] = useState<"no-auth" | "auth" | "loading">("loading");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("current-user");

    if (currentUser) {
      setCurrentUser(JSON.parse(currentUser));
      setIsAuth("auth");
    } else {
      setIsAuth("no-auth");
    }
  }, []);

  return [isAuth, currentUser] as const;
};
