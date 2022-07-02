import { get_published_ads } from "../../../apps/brand_apis/get_pub_ads";
import { Request } from "express";
import { c_token_assoc_values } from "../../../controllers/token/token_controller";
import { CREATOR } from "../../../user.types";


export const c_get_all_pubished_ad_sequence = async (req: Request) => {
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

        // @ts-ignore
        let brand_id = token_assoc_status.id_brand;
        let published_ads_resp = await get_published_ads(brand_id);

        return published_ads_resp;

    }
    return {
        status: 400,
        message: "Not an auth token"
    }
}