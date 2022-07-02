import { prisma_client } from "../../base_imports";
import crypto from "crypto";
import { BRAND, CREATOR } from "../../controllers/user.types";

// Search for token to prevent calling the Auth APIs
export const token_search = async (token_value: string) => {
    let token_result = await prisma_client.token.findFirst({
        where: {
            token_value: token_value
        }
    });
    
    // user needs to login
    if (token_result === null) {
        return { 
            status: 401 
        };
    }
    
    // sucessful login
    return {
        status: 200,
        ...token_result
    };
}

// Create token credential check
export const create_token =
    async (user_id: number, user_type: string, email: string, password: string) => {

        // creating token by hashing function parameters

        let token = crypto.createHash("sha256")
            .update(JSON.stringify({ email, password }))
            .digest("hex");

        let token_search_result = await token_search(token);

        // If token exist, return object, don't insert
        if (token_search_result.status === 200) {
            return token_search_result;
        }

        // if user has not logged i.e token not created

        if (user_type == BRAND) {
            await prisma_client.token.create({
                data: {
                    token_value: token,
                    user_type: user_type,
                    brands: {
                        connect: {
                            brand_id: user_id
                        }
                    }
                }
            });
        } 
        
        if (user_type == CREATOR) {
            await prisma_client.token.create({
                data: {
                    token_value: token,
                    user_type: user_type,
                    creators: {
                        connect: {
                            creator_id: user_id
                        }
                    }
                }
            });
            
        }; 

        // to return a consistent message object upon creation or error
        return await token_search(token);
    }

// Delete token aka Logout
export const delete_token = async (token_value: string) : Promise<object> => {
    let token_present_status = await token_search(token_value);

    // If token exists delete
    if (token_present_status.status === 200) {
        await prisma_client.token.delete({
            where: {
                token_value: token_value
            }
        });
    }

    // to return a consistent message object
    return await token_search(token_value);
}