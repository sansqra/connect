import { prisma, PrismaClient } from "@prisma/client";

export const prisma_client = new PrismaClient();

async function main() {
    let brand1 = {
        brand_name: "Nike",
        brand_email: "nike@nike.com",
        brand_password: "nike",
        brand_description: "We sell sports stuff"
    };

    let creator1 = {
        creator_name: "Ronaldo",
        creator_email: "ron@ron.com",
        creator_password: "ron",
        creator_description: "big short football guy"
    };
    
    let res1 = await prisma_client.brands.create({
        data: brand1
    });

    let res2 = await prisma_client.creators.create({
        data: creator1
    });
    
    console.log(res1, res2);
}

main()
    .catch((e) => {throw e})
    .finally(async () => await prisma_client.$disconnect());