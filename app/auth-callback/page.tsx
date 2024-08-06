"use client";

import { getAuthStatus } from "@/actions/auth/get-auth-status";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthCallbackPageProps {}

const AuthCallbackPage: React.FC<AuthCallbackPageProps> = () => {
   const [configId, setConfigId] = useState<string | null>(null);
   const router = useRouter();

   useEffect(() => {
      const configurationId = localStorage.getItem("configurationId");
      if (configurationId) setConfigId(configurationId);
   }, []);

   const { data } = useQuery({
      queryKey: ["auth-callback"],
      queryFn: async () => await getAuthStatus(),
      retry: true,
      retryDelay: 500,
   });

   if (data?.success) {
      if (configId) {
         localStorage.removeItem("configurationId");
         router.push(`/configure/preview?id=${configId}`);
      } else {
         router.push("/");
      }
   }

   return (
      <div className="w-full flex justify-center mt-24">
         <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-zinc-500" />
            <h3 className="font-semibold text-xl">Logging you in...</h3>
            <p className="">You will be redirected automatically.</p>
         </div>
      </div>
   );
};

export default AuthCallbackPage;
