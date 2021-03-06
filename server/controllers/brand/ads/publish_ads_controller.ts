import { publish_ad } from "../../../apps/brand_apis/publish_ads";
import { c_token_assoc_values } from "../../../controllers/token/token_controller";
import { Request } from "express";
import { CREATOR } from "../../../user.types";

export const c_publish_ad_sequence = async (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.length > 10) {

        let token = req.headers.authorization?.split(" ")[1];

        let token_assoc_status = await c_token_assoc_values(token);

        console.log(token_assoc_status);

        if (token_assoc_status.status == 401) {
            return {
                status: 400,
                message: "Invalid token"
            }
        }

        let user_type;
        if (token_assoc_status.status == 200) {
            // @ts-ignore
            user_type = token_assoc_status?.user_type;
            console.log(user_type);
        }

        if (user_type == CREATOR) {
            return {
                status: 400,
                message: "user is not brand"
            }
        }

        let advert_name = req.body.advert_name;
        let advert_description = req.body.advert_description;

        console.log(advert_name, advert_description);
        
        // @ts-ignore
        let brand_id = token_assoc_status.id_brand;
        console.log(brand_id);

        return await c_publish_ads(advert_name, advert_description, brand_id);
    } 
    // no auth token
    return {
        status: 400,
        message: "Not an auth token"
    };
    
}

export const c_publish_ads = 
    async (advert_name: string, advert_description: string, brand_id: number) => {
    return await publish_ad(advert_name, advert_description, brand_id);
}