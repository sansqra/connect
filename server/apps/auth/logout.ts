import { delete_token } from "../token";
import { not_null } from "../token/index.types";


export const logout = async (token_value: string) => {
    
    await delete_token(token_value);

    return {
        status: not_null,
        message: "user has been logged out"
    }
}