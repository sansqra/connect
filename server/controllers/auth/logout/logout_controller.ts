import { logout } from "../../../apps/auth/logout";

import { Request } from "express";

export const c_logout = async (req: Request) => {
    // not the right API
    await logout(req.headers.authorization!.split(" ")[1]);
}