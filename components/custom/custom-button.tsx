import React from "react";
import { Button, ButtonProps } from "../ui/button";

interface CustomButtonProps extends ButtonProps {
   isLoading?: boolean;
   loadingText?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
   isLoading,
   loadingText,
   children,
   ...props
}) => {
   return (
      <Button {...props}>
         {isLoading && loadingText ? loadingText : children}
         {isLoading && (
            <span className="flex items-center gap-1 ml-1.5">
               <span className="animate-flashing inline-block size-1 bg-white rounded-full" />
               <span className="animate-flashing inline-block size-1 bg-white rounded-full delay-100" />
               <span className="animate-flashing inline-block size-1 bg-white rounded-full delay-200" />
            </span>
         )}
      </Button>
   );
};
