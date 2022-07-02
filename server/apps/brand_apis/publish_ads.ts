import { prisma_client } from "../../base_imports";
import { not_null } from "../token/index.types";


export const publish_ad = async (
    advert_name: string,
    advert_description: string,
    brand_id: number
) => {

    let publish_ad_resp = await prisma_client.adverts.create({
        data: {
            advert_name         : advert_name,
            advert_description  : advert_description,
            brands              : {
                connect         : {
                    brand_id    : brand_id
                }
            }
        }
    });
    console.log(publish_ad_resp);
    return (publish_ad_resp === null) 
            ? { status: null, message: "could not publish ad" } 
            : { status: not_null, message: "ad created", ad_obj: {...publish_ad_resp}}
};