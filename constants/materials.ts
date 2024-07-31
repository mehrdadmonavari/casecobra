import { PRODUCT_PRICES } from "./product-prices";

export const MATERIALS = {
   name: "material",
   options: [
      {
         label: "silicone",
         value: "silicone",
         description: undefined,
         price: PRODUCT_PRICES.material.silicone,
      },
      {
         label: "Soft Polycarbonate",
         value: "polycarbonate",
         description: "Scratch-resistant coating",
         price: PRODUCT_PRICES.material.polycarbonate,
      },
   ],
} as const;
