import { get_all_ads } from "../../apps/common/get_all_ads";
import { c_token_assoc_values } from "../token/token_controller";
import { Request } from "express";

export const c_get_all_ads_sequence = async (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.length > 10) { 
        let token = req.headers.authorization?.split(" ")[1];

        let token_assoc_status = await c_token_assoc_values(token);

        if (token_assoc_status.status == 401) {
            return {
                status: 400,
                message: "Invalid token"
            }
        }

        let all_ads_obj = await get_all_ads();

        return {
            status: 200,
            message: "returning all ads from db",
            ad_list: {...all_ads_obj}
        }
    }
    // no token provided
    return {
        status: 400,
        message: "Not an auth token"
    };
}