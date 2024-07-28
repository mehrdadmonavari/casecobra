import React from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { ReviewGrid } from "./review-grid";

export const Reviews: React.FC = () => {
   return (
      <MaxWidthWrapper className="relative max-w-5xl">
         <img
            className="absolute select-none hidden xl:block -left-32 top-1/3"
            src="/what-people-are-buying.png"
            aria-hidden="true"
         />
         <ReviewGrid />
      </MaxWidthWrapper>
   );
};
