"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { base64ToBlob, cn, formatPrice } from "@/lib/utils";
import { ResizeHandleComponent } from "./resize-handle-component";
import { PHONE_COLORS } from "@/constants/phone-colors";
import { PHONE_MODELS } from "@/constants/phone-models";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { RadioGroup } from "@headlessui/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { MATERIALS } from "@/constants/materials";
import { FINISHES } from "@/constants/finishes";
import { BASE_PRICE } from "@/constants/base-price";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import {
   SaveConfigurationType,
   saveConfiguration as actionSaveConfig,
} from "@/actions/configuration/seve-configuration";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
   configId: string;
   imageUrl: string;
   imageDimensions: { width: number; height: number };
}

export const DesignConfigurator: React.FC<DesignConfiguratorProps> = ({
   configId,
   imageUrl,
   imageDimensions,
}) => {
   const { toast } = useToast();
   const router = useRouter();
   const [options, setOptions] = useState<{
      color: (typeof PHONE_COLORS)[number];
      model: (typeof PHONE_MODELS.options)[number];
      material: (typeof MATERIALS.options)[number];
      finish: (typeof FINISHES.options)[number];
   }>({
      color: PHONE_COLORS[0],
      model: PHONE_MODELS.options[PHONE_MODELS.options.length - 1],
      material: MATERIALS.options[0],
      finish: FINISHES.options[0],
   });
   const [renderedDimentions, setRenderedDimentions] = useState({
      width: imageDimensions.width / 4,
      height: imageDimensions.height / 4,
   });
   const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 205 });

   const phoneCaseRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   const { startUpload } = useUploadThing("imageUploader");

   const { mutate: saveConfig } = useMutation({
      mutationKey: ["save-configuration"],
      mutationFn: async (args: SaveConfigurationType) => {
         await Promise.all([saveConfiguration(), actionSaveConfig(args)]);
      },
      onSuccess: () => {
         router.push(`/configure/preview?id=${configId}`);
      },
      onError: () => {
         toast({
            title: "Something went wrong",
            description: "There was an error on our end. Please try again.",
            variant: "destructive",
         });
      },
   });

   const saveConfiguration = async () => {
      try {
         const {
            left: caseLeft,
            top: caseTop,
            width,
            height,
         } = phoneCaseRef.current!.getBoundingClientRect();

         const { left: containerLeft, top: containerTop } =
            containerRef.current!.getBoundingClientRect();

         const leftOffset = caseLeft - containerLeft;
         const topOffset = caseTop - containerTop;

         const actualX = renderedPosition.x - leftOffset;
         const actualY = renderedPosition.y - topOffset;

         const canvas = document.createElement("canvas");
         canvas.width = width;
         canvas.height = height;
         const ctx = canvas.getContext("2d");

         const userImage = new Image();
         userImage.crossOrigin = "anonymous";
         userImage.src = imageUrl;
         await new Promise((resolve) => (userImage.onload = resolve));

         ctx?.drawImage(
            userImage,
            actualX,
            actualY,
            renderedDimentions.width,
            renderedDimentions.height
         );

         const base64 = canvas.toDataURL();
         const base64Data = base64.split(",")[1];

         const blob = base64ToBlob(base64Data, "image/png");
         const file = new File([blob], "fileName.png", { type: "image/png" });

         await startUpload([file], { configId });
      } catch (err) {
         toast({
            title: "Something went wrong",
            description: "There was a problem saving your config, please try again.",
            variant: "destructive",
         });
      }
   };

   return (
      <div className="relative grid grid-cols-1 lg:grid-cols-3 mt-20 mb-20 pb-20">
         <div
            ref={containerRef}
            className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
               <AspectRatio
                  ref={phoneCaseRef}
                  ratio={896 / 1831}
                  className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
                  <NextImage
                     className="pointer-events-none z-50 select-none"
                     src="/phone-template.png"
                     alt="phone image"
                     fill
                  />
               </AspectRatio>
               <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
               <div
                  className={cn(
                     "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
                     `bg-${options.color.tw}`
                  )}
               />
            </div>
            <Rnd
               default={{
                  x: 150,
                  y: 250,
                  height: imageDimensions.height / 4,
                  width: imageDimensions.width / 4,
               }}
               lockAspectRatio
               resizeHandleComponent={{
                  topLeft: <ResizeHandleComponent />,
                  topRight: <ResizeHandleComponent />,
                  bottomLeft: <ResizeHandleComponent />,
                  bottomRight: <ResizeHandleComponent />,
               }}
               onResizeStop={(_, __, ref, ___, { x, y }) => {
                  setRenderedDimentions({
                     width: parseInt(ref.style.width.slice(0, -2)),
                     height: parseInt(ref.style.height.slice(0, -2)),
                  });
                  setRenderedPosition({ x, y });
               }}
               onDragStop={(_, { x, y }) => setRenderedPosition({ x, y })}
               className="absolute z-20 border-[3px] border-primary">
               <div className="relative w-full h-full">
                  <NextImage
                     src={imageUrl}
                     className="pointer-events-none"
                     alt="your image"
                     fill
                  />
               </div>
            </Rnd>
         </div>

         <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 mt-8 lg:mt-0 flex flex-col bg-white">
            <ScrollArea className="relative flex-1 overflow-auto">
               <div className="px-8 pb-12 pt-8">
                  <h2 className="tracking-tight font-bold text-3xl">
                     Customize your case
                  </h2>
                  <div className="w-full h-px bg-zinc-200 my-6" />
                  <div className="relative mt-4 h-full flex flex-col justify-between">
                     <div className="flex flex-col gap-6">
                        <RadioGroup
                           value={options.color}
                           onChange={(val) =>
                              setOptions((prev) => ({ ...prev, color: val }))
                           }>
                           <Label>Color: {options.color.label}</Label>
                           <div className="flex items-center space-x-3 mt-3">
                              {PHONE_COLORS.map((color) => (
                                 <RadioGroup.Option
                                    key={color.label}
                                    value={color}
                                    className={({ active, checked }) =>
                                       cn(
                                          "relative -m-0.5 p-0.5 flex justify-center items-center rounded-full border-2 border-transparent cursor-pointer active:ring-0 focus:ring-0 active:outline-none focus:outline-none",
                                          {
                                             [`border-${color.tw}`]: active || checked,
                                          }
                                       )
                                    }>
                                    <span
                                       className={cn(
                                          `bg-${color.tw}`,
                                          "size-8 rounded-full border border-black border-opacity-10"
                                       )}
                                    />
                                 </RadioGroup.Option>
                              ))}
                           </div>
                        </RadioGroup>

                        <div className="relative w-full flex flex-col gap-3">
                           <Label>Model</Label>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button
                                    className="w-full justify-between"
                                    variant="outline"
                                    role="combobox">
                                    {options.model.label}
                                    <ChevronsUpDown className="size-4 ml-2 shrink-0 opacity-50" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                 {PHONE_MODELS.options.map((model) => (
                                    <DropdownMenuItem
                                       key={model.label}
                                       className={cn(
                                          "flex items-center gap-1 p-1.5 text-center cursor-default hover:bg-zinc-100",
                                          {
                                             "bg-zinc-100":
                                                model.label === options.model.label,
                                          }
                                       )}
                                       onClick={() =>
                                          setOptions((prev) => ({ ...prev, model }))
                                       }>
                                       <Check
                                          className={cn(
                                             "size-4 mr-2",
                                             model.label === options.model.label
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                       {model.label}
                                    </DropdownMenuItem>
                                 ))}
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>

                        {[MATERIALS, FINISHES].map(
                           ({ name, options: selectableOptions }) => (
                              <RadioGroup
                                 key={name}
                                 value={options[name]}
                                 onChange={(val) =>
                                    setOptions((prev) => ({ ...prev, [name]: val }))
                                 }>
                                 <Label>
                                    {name.slice(0, 1).toUpperCase() + name.slice(1)}
                                 </Label>
                                 <div className="mt-3 space-y-4">
                                    {selectableOptions.map((option) => (
                                       <RadioGroup.Option
                                          key={option.value}
                                          value={option}
                                          className={({ active, checked }) =>
                                             cn(
                                                "relative block sm:flex sm:justify-between cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 ring-0 outline-none focus:ring-0 focus:outline-none",
                                                {
                                                   "border-primary": active || checked,
                                                }
                                             )
                                          }>
                                          <span className="flex items-center">
                                             <span className="flex flex-col text-sm">
                                                <RadioGroup.Label
                                                   className="font-medium text-gray-900"
                                                   as="span">
                                                   {option.label}
                                                </RadioGroup.Label>
                                                {option.description && (
                                                   <RadioGroup.Description
                                                      className="text-gray-500"
                                                      as="span">
                                                      <span className="block sm:inline">
                                                         {option.description}
                                                      </span>
                                                   </RadioGroup.Description>
                                                )}
                                             </span>
                                          </span>
                                          <RadioGroup.Description
                                             className="flex sm:flex-col text-sm mt-2 sm:mt-0 sm:ml-4 sm:text-right "
                                             as="span">
                                             <span className="font-medium text-gray-900">
                                                {formatPrice(option.price / 100)}
                                             </span>
                                          </RadioGroup.Description>
                                       </RadioGroup.Option>
                                    ))}
                                 </div>
                              </RadioGroup>
                           )
                        )}
                     </div>
                  </div>
               </div>
            </ScrollArea>

            <div className="relative w-full px-8 h-16 bg-white">
               <div
                  className="absolute z-10 inset-x-0 bottom-16 h-14 bg-gradient-to-t from-white pointer-events-none"
                  aria-hidden={true}
               />
               <div className="h-px w-full bg-zinc-200" />
               <div className="w-full h-full flex justify-end items-center">
                  <div className="w-full flex items-center gap-6">
                     <p className="font-medium whitespace-nowrap">
                        {formatPrice(
                           (BASE_PRICE + options.material.price + options.finish.price) /
                              100
                        )}
                     </p>
                     <Button
                        onClick={() =>
                           saveConfig({
                              configId,
                              color: options.color.value,
                              model: options.model.value,
                              material: options.material.value,
                              finish: options.finish.value,
                           })
                        }
                        className="w-full"
                        size="sm">
                        Continue
                        <ArrowRight className="size-4 ml-1.5 inline" />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
