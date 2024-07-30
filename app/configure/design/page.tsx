import { getConfigurationById } from "@/actions/configuration/get-configuration-by-id";
import { notFound } from "next/navigation";
import React from "react";
import { DesignConfigurator } from "./_components/design-configurator";

interface DesignPageProps {
   searchParams: {
      [key: string]: string | string[] | undefined;
   };
}

const DesignPage: React.FC<DesignPageProps> = async ({ searchParams }) => {
   const { id } = searchParams;

   if (!id || typeof id !== "string") {
      return notFound();
   }

   const configuration = await getConfigurationById(id);

   if (!configuration) {
      return notFound();
   }

   const { imageUrl, width, height } = configuration;

   return (
      <DesignConfigurator
         configId={configuration.id}
         imageUrl={imageUrl}
         imageDimensions={{ width, height }}
      />
   );
};

export default DesignPage;
