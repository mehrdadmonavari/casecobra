import React from "react";
import { MaxWidthWrapper } from "../_components/max-width-wrapper";
import { Steps } from "../_components/steps";

interface ConfigureLayoutProps {
   children: React.ReactNode;
}

const ConfigureLayout: React.FC<ConfigureLayoutProps> = ({ children }) => {
   return (
      <MaxWidthWrapper className="flex-1 flex flex-col">
         <Steps />
         {children}
      </MaxWidthWrapper>
   );
};

export default ConfigureLayout;
