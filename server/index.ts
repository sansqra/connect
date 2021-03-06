// IMPORTS

// -- SERVER --
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import * as swaggerUI from "swagger-ui-express";

// enabling json module
import * as swaggerDocument from "./swagger.json";
// -- --

// -- CONTROLLERS --

// > AUTH CONTROLLERS
import { c_login_with_brand } from "./controllers/auth/login/brand_login_controller";
import { c_login_with_creator } from "./controllers/auth/login/creator_login_controller";
import { c_logout } from "./controllers/auth/logout/logout_controller";


// BRAND API imports
import { c_publish_ad_sequence } from "./controllers/brand/ads/publish_ads_controller";
import { c_get_all_pubished_ad_sequence } from "./controllers/brand/ads/get_published_ads_controller";

// CREATOR API imports
import { c_creator_ad_apply_sequence } from "./controllers/creator/ad_apply";

// COMMON API imports
import { c_get_all_ads_sequence } from "./controllers/common/get_all_ads_controller";


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


// Route to Creator_login
app.post("/creator_login", async (req: Request, res: Response) => 
    res.json(await c_login_with_creator(req.body.email, req.body.password)));


// Route to logout | Token in Header
app.get("/logout", async (req: Request, res: Response) => {
    res.json(await c_logout(req));
});


// BRAND APIS

// API for brands to publish Ads

app.post("/brand_publish_ads", async (req: Request, res: Response) => {
   let resp = await c_publish_ad_sequence(req);

   if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
   };
});

// API for brand to see all their published ads
app.get("/get_all_published_ads", async (req: Request, res: Response) => {
    let resp = await c_get_all_pubished_ad_sequence(req);

    if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
   }
});

// API for brands to see all creators on Connect

// CREATOR APIS

// API for creators to apply to ads they select
app.post("/ad_apply", async (req: Request, res: Response) => {
    let resp = await c_creator_ad_apply_sequence(req);
    if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
   }
});

// API for creators to see a particular brand's profile given brand_id (extracted from ad info)


// API for creator to see their profile details


// COMMON APIS

// API for any user_type to see all ads by all brands
app.get("/get_all_ads", async (req: Request, res: Response) => {
    let resp = await c_get_all_ads_sequence(req);

    if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
    }
});

// API for user of any type to see their profile (user_type extracted from token object)


app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', "Server listening @ localhost:" + port);
});