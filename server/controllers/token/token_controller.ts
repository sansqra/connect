import { token_search } from "../../apps/token";

// Checks if token is valid
export const c_token_assoc_values = async (token: string) => await token_search(token);