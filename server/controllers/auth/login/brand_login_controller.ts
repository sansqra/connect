import { login } from "../../../apps/auth/login";
import { BRAND } from "../../user.types";

export const c_login_with_brand = async (email: string, password: string) => {
    let login_with_brand_response = await login(email, password, BRAND);
    return login_with_brand_response;
}