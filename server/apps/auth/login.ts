import { prisma_client } from "../../base_imports";
import { create_token } from "../token";

export const login = 
    async (email : string, password: string, user_type: string) => {
    
    switch (user_type) {
        case "br": return   brand_login(email, password, user_type);
        case "cr": return   creator_login(email, password, user_type);
    };
}

const brand_login = 
    async (email: string, password: string, user_type: string) => {
    
    let brand_find_result = await prisma_client.brands.findFirst({
        where: {
            brand_email: email,
            brand_password: password
        }
    });

    // Creating token if brand account exists
    if (brand_find_result === null) return  { status: null, message: "brand account does not exist" }
    return create_token(brand_find_result?.brand_id!, user_type, email, password);
}

const creator_login = 
    async (email: string, password: string, user_type: string) => {
    
    let creator_find_result = await prisma_client.creators.findFirst({
        where: {
            creator_email: email,
            creator_password: password
        }
    });

    // Creating token if creator account exists
    if (creator_find_result === null) return  { status: null, message: "creator account does not exist" }
    return create_token(creator_find_result?.creator_id!, user_type, email, password);
}