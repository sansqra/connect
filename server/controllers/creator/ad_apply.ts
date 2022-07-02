import {Request} from "express";
import { c_token_assoc_values } from "../token/token_controller";
import { BRAND } from "../../user.types";
import { apply_to_ad } from "../../apps/creator_apis/apply_to_ad";
import { prisma_client } from "../../base_imports";

export const c_creator_ad_apply_sequence = async (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.length > 10) { 
        let token = req.headers.authorization?.split(" ")[1];

        let token_assoc_status = await c_token_assoc_values(token);

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

        if (user_type == BRAND) {
            return {
                status: 400,
                message: "user is not creator"
            }
        }

        // Extracting ids
        let advert_id: number = req.body.advert_id;
        let count_advert = await prisma_client.adverts.count();
        if (advert_id > count_advert) {
            return {
                status: 401,
                message: "ad does not exist"
            }
        }
        
        // @ts-ignore
        let creator_id: number = token_assoc_status?.id_creator;

        // Submitting application
        let application_obj = await apply_to_ad(advert_id, creator_id);

        return {
            status: 200,
            message: "returning all ads from db",
            application: {...application_obj}
        }
    }
    // no token provided
    return {
        status: 400,
        message: "Not an auth token"
    };
}