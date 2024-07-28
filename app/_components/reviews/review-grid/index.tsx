"use client";

import { PHONES } from "@/constants/phones";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ReviewColumn } from "../review-column";
import { cn } from "@/lib/utils";

function splitArray<T>(array: Array<T>, numParts: number) {
   const result: Array<Array<T>> = [];

   for (let i = 0; i < array.length; i++) {
      const index = i % numParts;
      if (!result[index]) {
         result[index] = [];
      }
      result[index].push(array[i]);
   }

   return result;
}

export const ReviewGrid = () => {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const isInView = useInView(containerRef, { once: true, amount: 0.4 });
   const columns = splitArray(PHONES, 3);
   const column1 = columns[0];
   const column2 = columns[1];
   const column3 = splitArray(columns[2], 2);

   return (
      <>
         <div ref={containerRef} className="-mx-4 mt-16 lg:relative lg:overflow-hidden">
            <div
               className="relative grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden lg:overflow-visible px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:rotate-45 lg:scale-[140%]">
               {isInView && (
                  <>
                     <ReviewColumn
                        reviews={[...column1, ...column3.flat(), ...column2]}
                        reviewClassName={(reviewIndex) =>
                           cn({
                              "md:hidden":
                                 reviewIndex >= column1.length + column3[0].length,
                              "lg:hidden": reviewIndex >= column1.length,
                           })
                        }
                        msPerPixel={10}
                     />
                     <ReviewColumn
                        reviews={[...column2, ...column3[1]]}
                        className="hidden md:block"
                        reviewClassName={(reviewIndex) =>
                           reviewIndex >= column2.length ? "lg:hidden" : ""
                        }
                        msPerPixel={15}
                     />
                     <ReviewColumn
                        reviews={[...column3.flat()]}
                        className="hidden md:block"
                        msPerPixel={10}
                     />
                     <ReviewColumn
                        reviews={[...column3.flat()]}
                        className="hidden md:block"
                        msPerPixel={15}
                     />
                  </>
               )}
            </div>
            <div className="pointer-events-none absolute inset-x-0 -top-0.5 md:top-0 h-32 bg-gradient-to-b from-slate-100" />
            <div className="pointer-events-none absolute inset-x-0 -bottom-0.5 md:bottom-0 h-32 bg-gradient-to-t from-slate-100" />
            <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-100" />
            <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-100" />
         </div>
      </>
   );
};
