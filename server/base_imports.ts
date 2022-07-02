import { PrismaClient } from "@prisma/client";

export const prisma_client = new PrismaClient();

export const prisma_disconnect = async () => {
    await prisma_client.$disconnect();
    console.log("Prima connection disconnected");
}