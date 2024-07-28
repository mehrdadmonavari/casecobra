"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Review } from "../review";

interface ReviewColumnProps {
   reviews: { src: string }[];
   className?: string;
   reviewClassName?: (reviewIndex: number) => string;
   msPerPixel?: number;
}

export const ReviewColumn: React.FC<ReviewColumnProps> = ({
   reviews,
   className,
   reviewClassName,
   msPerPixel = 0,
}) => {
   const columnRef = useRef<HTMLDivElement | null>(null);
   const [columnHeight, setColumnHeight] = useState(0);
   const duration = `${columnHeight * msPerPixel}ms`;

   useEffect(() => {
      if (!columnRef.current) return;
      const resizeObserver = new window.ResizeObserver(() => {
         setColumnHeight(columnRef.current?.offsetHeight ?? 0);
      });
      resizeObserver.observe(columnRef.current);

      return () => {
         resizeObserver.disconnect();
      };
   }, []);

   return (
      <div
         ref={columnRef}
         className={cn("animate-marquee space-y-8 py-4", className)}
         style={{ "--marquee-duration": duration } as React.CSSProperties}>
         {reviews.concat(reviews).map((img, reviewIndex) => (
            <Review
               key={reviewIndex}
               className={reviewClassName?.(reviewIndex % reviews.length)}
               imgSrc={img.src}
            />
         ))}
      </div>
   );
};
