"use client";

import { Phone } from "@/app/_components/phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE } from "@/constants/base-price";
import { PHONE_COLORS } from "@/constants/phone-colors";
import { PHONE_MODELS } from "@/constants/phone-models";
import { PRODUCT_PRICES } from "@/constants/product-prices";
import { cn, formatPrice } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

interface DesignPreviewProps {
   configuration: Configuration;
}

export const DesignPreview: React.FC<DesignPreviewProps> = ({ configuration }) => {
   const [showConfetti, setShowConfetti] = useState(false);
   useEffect(() => {
      setShowConfetti(true);
   }, []);

   const router = useRouter();
   if (!configuration.croppedImageUrl)
      router.push(`/configure/design?id=${configuration.id}`);

   const tw = PHONE_COLORS.find(
      (supportedColor) => supportedColor.value === configuration.color
   )?.tw;
   const modelLabel = PHONE_MODELS.options.find(
      (supportedModels) => supportedModels.value === configuration.model
   )?.label;

   let totalPrice = BASE_PRICE;
   if (configuration.material === "polycarbonate")
      totalPrice += PRODUCT_PRICES.material.polycarbonate;
   if (configuration.finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

   return (
      <>
         <div
            className="pointer-events-none select-none absolute flex justify-center inset-0 overflow-hidden"
            aria-hidden="true">
            <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 text-sm mt-20">
            <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
               <Phone
                  className={cn(`bg-${tw}`)}
                  imgSrc={configuration.croppedImageUrl!}
               />
            </div>

            <div className="sm:col-span-9 mt-6 md:mt-0 md:row-end-1">
               <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                  Your {modelLabel} Case
               </h3>
               <div className="flex items-center gap-1.5 mt-3 text-base">
                  <Check className="size-4 text-green-500" />
                  In stock and ready to ship
               </div>
            </div>

            <div className="sm:col-span-12 md:col-span-9 text-base">
               <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 gap-y-8 border-b border-gray-200 py-8 sm:py-6 md:py-10">
                  <div>
                     <p className="font-medium text-zinc-950">Highlights</p>
                     <ol className="mt-3 text-zinc-700 list-disc list-inside">
                        <li>Wireless charging compatible</li>
                        <li>TPU shock absorption</li>
                        <li>Packaging made from recycled materials</li>
                        <li>5 year print warranty</li>
                     </ol>
                  </div>
                  <div>
                     <p className="font-medium text-zinc-950">Materials</p>
                     <ol className="mt-3 text-zinc-700 list-disc list-inside">
                        <li>High-quality, durable material</li>
                        <li>Scratch- and fingerprint resistant coating</li>
                     </ol>
                  </div>
               </div>

               <div className="mt-8">
                  <div className="bg-gray-50 p-6 sm:p-8 sm:rounded-lg">
                     <div className="flow-root text-sm">
                        <div className="flex justify-between items-center py-1 mt-2">
                           <p className="text-gray-600">Base Price </p>
                           <p className="font-medium text-gray-900 ml-0.5">
                              {formatPrice(BASE_PRICE / 100)}
                           </p>
                        </div>
                        {configuration.material == "polycarbonate" && (
                           <div className="flex justify-between items-center py-1 mt-2">
                              <p className="text-gray-600">
                                 Soft polycarbonate material{" "}
                              </p>
                              <p className="font-medium text-gray-900 ml-0.5">
                                 {formatPrice(
                                    PRODUCT_PRICES.material.polycarbonate / 100
                                 )}
                              </p>
                           </div>
                        )}
                        {configuration.finish == "textured" && (
                           <div className="flex justify-between items-center py-1 mt-2">
                              <p className="text-gray-600">Textured finish </p>
                              <p className="font-medium text-gray-900 ml-0.5">
                                 {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                              </p>
                           </div>
                        )}

                        <div className="h-px my-2 bg-gray-200" />

                        <div className="flex justify-between items-center py-2">
                           <p className="font-semibold text-gray-900">Order total</p>
                           <p className="font-semibold text-gray-900">
                              {formatPrice(totalPrice / 100)}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end mt-8 pb-12">
                     <Button className="px-4 sm:px-6 lg:px-8">
                        Check out <ArrowRight className="size-4 ml-1.5 inline" />{" "}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
