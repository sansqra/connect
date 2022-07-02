import { prisma_client } from "../../base_imports";
import { Token_Result_Message, not_null } from "./index.types";
import crypto from "crypto";
import { BRAND } from "../../index.types";

// Search for token to prevent calling the Auth APIs
export const token_search = async (token_value: string) => {
    let token_result = await prisma_client.token.findFirst({
        where: {
            token_value: token_value
        }
    });
    // user needs to login
    if (token_result === null) {
        return { status: "null" };
    } 

    switch (token_result) {

        case null: return {
            status: "null"
        }

        default: return {   status: not_null, 
                            ...token_result
                        }
                    }
}

// Create token post login
export const create_token =
    async (user_id: number, user_type: string, email: string, password: string) : Promise<object> => {

        // creating by hashing function parameters

        let token_value = crypto.createHash("sha256")
            .update(JSON.stringify({ email, password }))
            .digest("hex");

        let token_search_result = await token_search(token_value);

        if (token_search_result.status === not_null) {
            return token_search_result;
        }

        // if user has not logged i.e token not created

        let token_obj: object;

        if (user_type == BRAND) {
            token_obj = await prisma_client.token.create({
                data: {
                    token_value: token_value,
                    user_type: user_type,
                    brands: {
                        connect: {
                            brand_id: user_id
                        }
                    }
                }
            });
        } else {
            token_obj = await prisma_client.token.create({
                data: {
                    token_value: token_value,
                    user_type: user_type,
                    brands: {
                        connect: {
                            brand_id: user_id
                        }
                    }
                }
            });
        };
        return token_obj;
    }

// Delete token aka Logout
export const delete_token = async (token_value: string) : Promise<object> => {
    let token_present_status = await token_search(token_value);

    if (token_present_status.status === not_null) {
        await prisma_client.token.delete({
            where: {
                token_value: token_value
            }
        });
    }

    // Checking delete status by querying token value, returns an adequate response
    let token_present = await token_search(token_value);
    return token_present;
}