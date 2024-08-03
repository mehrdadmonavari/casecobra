import React from "react";
import { notFound } from "next/navigation";
import { getConfigurationById } from "@/actions/configuration/get-configuration-by-id";
import { DesignPreview } from "./_components/design-preview.tsx";

interface PreviewPageProps {
   searchParams: {
      [key: string]: string | string[] | undefined;
   };
}

const PreviewPage: React.FC<PreviewPageProps> = async ({ searchParams }) => {
   const { id } = searchParams;
   if (!id || typeof id !== "string") return notFound();

   const configuration = await getConfigurationById(id);
   if (!configuration) return notFound();
      
   return <DesignPreview configuration={configuration} />;
};

export default PreviewPage;
