import { logout } from "../../apps/auth/logout";

export const c_logout = async (token: string) => await logout(token);