import { publish_ad } from "../../../apps/brand_apis/publish_ads";


export const c_publish_ads = 
    async (advert_name: string, advert_description: string, brand_id: number) => {
    return await publish_ad(advert_name, advert_description, brand_id);
}