import { prisma_client } from "../../base_imports";
import { not_null } from "../token/index.types";

export const get_published_ads = async (brand_id: number) => {
    let get_published_ads_resp = await 
        prisma_client.adverts.findMany({
            where: {
                brand_id: brand_id
            }
        });

    if (get_published_ads_resp === null || 
       get_published_ads_resp === undefined) 
    {
        return {
            status: "null",
            "message": "Brand has not published any ads"
        }
    }

    return {
        status: not_null,
        message: "brand has published ads",
        ads: get_published_ads_resp
    }
}