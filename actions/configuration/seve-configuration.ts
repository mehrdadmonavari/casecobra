"use server";

import { db } from "@/db";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export type SaveConfigurationType = {
   color: CaseColor;
   model: PhoneModel;
   material: CaseMaterial;
   finish: CaseFinish;
   configId: string;
};

export async function saveConfiguration({
   color,
   model,
   material,
   finish,
   configId,
}: SaveConfigurationType) {
   await db.configuration.update({
      where: {
         id: configId,
      },
      data: {
         color,
         finish,
         material,
         model,
      },
   });
}
