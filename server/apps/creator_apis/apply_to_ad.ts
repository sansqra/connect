import { prisma_client } from "../../base_imports";

export const apply_to_ad = async (advert_id: number, creator_id: number) => {
    let create_application = await prisma_client.ad_applications.create({
        data: {
            adverts: {
                connect: {
                    advert_id: advert_id
                }
            },
            creators: {
                connect: {
                    creator_id: creator_id
                }
            }
        }
    });

    return create_application;
}