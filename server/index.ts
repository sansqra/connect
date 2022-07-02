// IMPORTS

// -- SERVER --
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as swaggerUI from "swagger-ui-express";

// enabling json module
import * as swaggerDocument from "./swagger.json";

import { CREATOR } from "./controllers/user.types";
// -- --

// -- CONTROLLERS --

// > AUTH CONTROLLERS
import { c_login_with_brand } from "./controllers/auth/login/brand_login_controller";
import { c_login_with_creator } from "./controllers/auth/login/creator_login_controller";
import { c_logout } from "./controllers/auth/logout/logout_controller";

// take this outta here
import { token_search } from "./apps/token";

// BRAND API imports
import { get_published_ads } from "./apps/brand_apis/get_pub_ads";
import { c_token_assoc_values, get_user_type_from_assoc_values } from "./controllers/token/token_controller";
import { c_publish_ads } from "./controllers/brand/ads/publish_ads_controller";

dotenv.config();

// Configuring base
const app: Express = express();

// Using custom middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    '/api-docs',
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument)
  );

// setting port from .env
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.json({
        server: "Welcome to ConnectServer!"
    })
});

// -- AUTH ROUTES --
// Route to Brand_Login
app.post("/brand_login", async (req: Request, res: Response) => 
    res.json(await c_login_with_brand(req.body.email, req.body.password)));

app.post("/brand_login", async (req: Request, res: Response) => 
    res.json(await c_login_with_brand(req.body.email, req.body.password)));

// Route to Creator_login
app.post("/creator_login", async (req: Request, res: Response) => 
    res.json(await c_login_with_creator(req.body.email, req.body.password)));


// Route to logout | Token in Header
app.post("/logout", async (req: Request, res: Response) => 
    res.json(await c_logout(req.headers.authorization?.split(" ")[1]!)));


// BRAND APIS

// app.post("/brand_publish_ads") => {header: token}

app.post("/brand_publish_ads", async (req: Request, res: Response) => {

    // Checking if auth token exists
    if (req.headers.authorization) {

        // extracting token from header
        let token = req.headers.authorization.split(' ')[1];
        
        // checking token validity & getting all token associated values
        let token_assoc_values = await c_token_assoc_values(token);
        
        // Brand has not logged in | invalid token | brand account not created
        if (token_assoc_values.status == 401) {
            // first value of spread will return status
            res.json({
                ...token_assoc_values, 
                message: "Brand has not logged in | invalid token | brand account not created"
            });
            return;
        }

        // if token_assoc_values.status == 200

        // If user is creator, rejecting request
        if (await get_user_type_from_assoc_values(token) == CREATOR) {
            res.json({
                status: 400,
                message: "user is not brand"
            });
            return;
        }

        // Finally only brands can execute the following code :)
        
        // Extract details to publish ad
        let advert_name = req.body.advert_name;
        let advert_description = req.body.advert_description;
        
        // @ts-ignore | There's always gonna be the brand id, I think, but still ignoring
        let brand_id = token_assoc_values?.id_brand;

        // Publishing the add
        let publish_ad_response = 
            await c_publish_ads(
                advert_name = advert_name, 
                advert_description = advert_description, 
                brand_id = brand_id
            );
            
        // Checking if ad was created or not

        if (publish_ad_response.status == 401) {
            res.json(JSON.stringify(publish_ad_response));
            return;
        }

        // Ad was succesfully published
        res.json(JSON.stringify(publish_ad_response));
    }
});

// app.get() get all published ads => should return ad_id => ad_id can then view application
app.get("/get_published_ads", async (req: Request, res: Response) => {

    if (req.headers.authorization) {
        let bearer_token = req.headers.authorization.split(' ')[1];
        let token_search_resp = await token_search(bearer_token);

        console.log(token_search_resp);

        // @ts-ignore
        let brand_id = token_search_resp.id_brand;

        if (token_search_resp.status === null) {
            res.json({
                status: "null",
                message: "brand cannot view the ads requested for and must login first"
            });
            return;
        }
        let get_pub_ads_resp = await get_published_ads(
            brand_id
        );
        
        // console.log(get_pub_ads_resp);

        res.json(
            get_pub_ads_resp
        );
    }
});

// app.get() get all applications for ad where ad = ad_id
// app.get() get all creator profiles

// CREATOR APIS
// app.put("/creator_apply_to_ad") => {header: token}
// app.put("/view_applications") | applications where creator_id =


// GENERIC APIS
// app.get("/get_ads") | Get ad where id = ad_id
// this will be used when creator clicks on single ad for info

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', "Server listening @ localhost:" + port);
});