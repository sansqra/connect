import { prisma, PrismaClient } from "@prisma/client";

export const prisma_client = new PrismaClient();

async function main() {
    let res = await prisma_client.brands.findFirst({
        where: {
            brand_id: 2
        }
    })
    console.log(res);
}

main()
    .catch((e) => {throw e})
    .finally(async () => await prisma_client.$disconnect());