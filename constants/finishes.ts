import { PRODUCT_PRICES } from "./product-prices";

export const FINISHES = {
   name: "finish",
   options: [
      {
         label: "Smooth Finish",
         value: "smooth",
         description: undefined,
         price: PRODUCT_PRICES.finish.smooth,
      },
      {
         label: "Textured Finish",
         value: "textured",
         description: "Soft grippy texture",
         price: PRODUCT_PRICES.finish.textured,
      },
   ],
} as const;
