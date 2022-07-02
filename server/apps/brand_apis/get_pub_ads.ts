import { prisma_client } from "../../base_imports";

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
            status: 400,
            "message": "Brand has not published any ads"
        }
    }

    return {
        status: 200,
        message: "brand has published ads",
        ads_list: get_published_ads_resp
    }
}