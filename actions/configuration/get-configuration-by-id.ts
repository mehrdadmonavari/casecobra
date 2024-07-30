import { db } from "@/db";

export const getConfigurationById = async (id: string) => {
   const configuration = await db.configuration.findUnique({ where: { id: id } });

   return configuration;
};
