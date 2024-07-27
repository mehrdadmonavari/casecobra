import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
   imgSrc: string;
   dark?: boolean;
}

export const Phone: React.FC<PhoneProps> = ({
   imgSrc,
   dark = false,
   className,
   ...props
}) => {
   return (
      <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)}>
         <img
            src={
               dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"
            }
            className="pointer-events-none z-50 select-none"
            alt="phone image"
         />
         <div className="absolute -z-10 inset-0">
            <img src={imgSrc} className="objcet-cover" alt="overlaying phone image" />
         </div>
      </div>
   );
};
