import { prisma_client } from "../../base_imports";


// Assuming that there are always ads
export const get_all_ads = async () => await prisma_client.adverts.findMany();
