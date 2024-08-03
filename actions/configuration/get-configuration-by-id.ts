"use server";

import { db } from "@/db";

export async function getConfigurationById(id: string) {
   const configuration = await db.configuration.findUnique({ where: { id: id } });

   return configuration;
}
