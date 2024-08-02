"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { cn, formatPrice } from "@/lib/utils";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { MATERIALS } from "@/constants/materials";
import { FINISHES } from "@/constants/finishes";

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

   return (
      <div className="relative grid grid-cols-3 mt-20 mb-20 pb-20">
         <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
               <AspectRatio
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

         <div className="relative h-[37.5rem] flex flex-col bg-white">
            <div
               className="absolute z-10 inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white pointer-events-none"
               aria-hidden={true}
            />
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
                                          { [`border-${color.tw}`]: active || checked }
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
                                                { "border-primary": active || checked }
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
         </div>
      </div>
   );
};
// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
