import { token_search } from "../../apps/token";

// Checks if token is valid
export const c_token_assoc_values = async (token: string) => await token_search(token);

// @ts-ignore
export const get_user_type_from_assoc_values = async (token: string) => await token_search(token)?.user_type;