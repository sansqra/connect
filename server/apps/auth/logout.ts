import { delete_token } from "../token";

export const logout = async (token_value: string) => {
    
    await delete_token(token_value);

    return {
        status: 200,
        message: "user has been logged out"
    }
}