import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { Phone } from "../../phone";

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
   imgSrc: string;
}

export const Review: React.FC<ReviewProps> = ({ imgSrc, className, ...props }) => {
   const POSSIBLE_ANIMATION_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];
   const animationDelay =
      POSSIBLE_ANIMATION_DELAYS[
         Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
      ];

   return (
      <div
         className={cn(
            "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5 transition duration-300 hover:scale-105 hover:shadow-slate-900/20",
            className
         )}
         style={{ animationDelay }}
         {...props}>
         <Phone imgSrc={imgSrc} />
      </div>
   );
};
