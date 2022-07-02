import { prisma, PrismaClient } from "@prisma/client";

export const prisma_client = new PrismaClient();

async function main() {
    let res = await prisma_client.creators.create({
        data: {
            creator_name: "cr2",
            creator_description: "I create a lot",
            creator_email: "cr2@cr2.com",
            creator_password: "cr2"
        }
    })
    console.log(res);
}

main()
    .catch((e) => {throw e})
    .finally(async () => await prisma_client.$disconnect());