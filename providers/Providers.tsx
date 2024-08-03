"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

const client = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
