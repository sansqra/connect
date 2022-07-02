import { login } from "../../../apps/auth/login";
import { CREATOR } from "../../../user.types";

export const c_login_with_creator = async (email: string, password: string) => {
    let login_with_creator_response = await login(email, password, CREATOR);
    return login_with_creator_response;
}