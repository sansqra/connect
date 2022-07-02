// SERVER IMPORTS
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { BRAND, CREATOR } from "./index.types";

// APPS
import { login } from "./apps/auth/login";
import { logout } from "./apps/auth/logout";
import { token_search } from "./apps/token";


// BRAND API imports
import { publish_ad } from "./apps/brand_apis/publish_ads";

dotenv.config();

// Configuring base
const app: Express = express();

// Using bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting port from .env
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.json({
        server: "ok"
    })
});


// Route to Brand_Login
app.post("/brand_login", async (req: Request, res: Response) => {

    let email: string = req.body.email;
    let password: string = req.body.password;

    let log_res = await login(email, password, BRAND);

    res.json(JSON.stringify(log_res));
});

// Route to Creator_login
app.post("/creator_login", async (req: Request, res: Response) => {
    let email: string = req.body.email;
    let password: string = req.body.password;

    let log_res = await login(email, password, CREATOR);

    res.json(JSON.stringify(log_res));
});

// Route to logout | change to app.delete
app.post("/logout", async (req: Request, res: Response) => {
    let token_value_from_req = req.body.token_value;

    let logout_res = await logout(token_value_from_req);

    res.json(logout_res);
});


// BRAND APIS

// app.post("/brand_publish_ads") => {header: token}

app.post("/brand_publish_ads", async (req: Request, res: Response) => {

    // Checking if auth exists
    if (req.headers.authorization) {
        
        // getting the token
        let bearer_token = req.headers.authorization.split(' ')[1];

        let token_search_resp = await token_search(bearer_token);
        console.log(token_search_resp);

        // that field was giving some error, didn't find it compelling to fix the type immediately
        // @ts-ignore
        let brand_id = token_search_resp.id_brand;


        // brand has not logged in
        if (token_search_resp.status === "null") {
            res.json(JSON.stringify({ status: "null", message: "brand must first login"}));

            // have to return else it executes the code below and tries to create the add with invalid token
            return;
        } 

        let publish_ad_resp = await publish_ad(
            req.body.advert_name,
            req.body.advert_description,
            brand_id
        );

        res.json(publish_ad_resp);
    }

});

// app.get() get all published ads => should return ad_id => ad_id can then view application
// app.get() get all applications for ad where ad = ad_id
// app.get() get all creator profiles

// CREATOR APIS

// app.get("/get_ads") => {header: token} | Gets all the ads available in db

// app.put("/creator_apply_to_ad") => {header: token}
// app.put("/view_applications") | applications where creator_id =


// GENERIC APIS
// app.get("/get_ad") | Get ad where id = ad_id
// this will be used when creator clicks on single ad for info

app.listen(port, () => {
    console.log("Server listening @ localhost:" + port);
});