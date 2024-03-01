"use client";
import { useAuthentication } from "@/hooks/use-authentication";
import React from "react";

const DashboardPage = () => {
  const session = useAuthentication();
  return <div>DashboardPage</div>;
};

export default DashboardPage;
