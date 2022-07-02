"use strict";
// IMPORTS
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// -- SERVER --
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const swaggerUI = __importStar(require("swagger-ui-express"));
// enabling json module
const swaggerDocument = __importStar(require("./swagger.json"));
const user_types_1 = require("./controllers/user.types");
// -- --
// -- CONTROLLERS --
// > AUTH CONTROLLERS
const brand_login_controller_1 = require("./controllers/auth/login/brand_login_controller");
const creator_login_controller_1 = require("./controllers/auth/login/creator_login_controller");
const logout_controller_1 = require("./controllers/auth/logout/logout_controller");
// take this outta here
const token_1 = require("./apps/token");
// BRAND API imports
const get_pub_ads_1 = require("./apps/brand_apis/get_pub_ads");
const token_controller_1 = require("./controllers/token/token_controller");
const publish_ads_controller_1 = require("./controllers/brand/ads/publish_ads_controller");
dotenv_1.default.config();
// Configuring base
const app = (0, express_1.default)();
// Using custom middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// setting port from .env
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.json({
        server: "Welcome to ConnectServer!"
    });
});
// -- AUTH ROUTES --
// Route to Brand_Login
app.post("/brand_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield (0, brand_login_controller_1.c_login_with_brand)(req.body.email, req.body.password)); }));
app.post("/brand_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield (0, brand_login_controller_1.c_login_with_brand)(req.body.email, req.body.password)); }));
// Route to Creator_login
app.post("/creator_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield (0, creator_login_controller_1.c_login_with_creator)(req.body.email, req.body.password)); }));
// Route to logout | Token in Header
app.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () { var _a; return res.json(yield (0, logout_controller_1.c_logout)((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1])); }));
// BRAND APIS
// app.post("/brand_publish_ads") => {header: token}
app.post("/brand_publish_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if auth token exists
    if (req.headers.authorization) {
        // extracting token from header
        let token = req.headers.authorization.split(' ')[1];
        // checking token validity & getting all token associated values
        let token_assoc_values = yield (0, token_controller_1.c_token_assoc_values)(token);
        // Brand has not logged in | invalid token | brand account not created
        if (token_assoc_values.status == 401) {
            // first value of spread will return status
            res.json(Object.assign(Object.assign({}, token_assoc_values), { message: "Brand has not logged in | invalid token | brand account not created" }));
            return;
        }
        // if token_assoc_values.status == 200
        // If user is creator, rejecting request
        if ((yield (0, token_controller_1.get_user_type_from_assoc_values)(token)) == user_types_1.CREATOR) {
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
        let brand_id = token_assoc_values === null || token_assoc_values === void 0 ? void 0 : token_assoc_values.id_brand;
        // Publishing the add
        let publish_ad_response = yield (0, publish_ads_controller_1.c_publish_ads)(advert_name = advert_name, advert_description = advert_description, brand_id = brand_id);
        // Checking if ad was created or not
        if (publish_ad_response.status == 401) {
            res.json(JSON.stringify(publish_ad_response));
            return;
        }
        // Ad was succesfully published
        res.json(JSON.stringify(publish_ad_response));
    }
}));
// app.get() get all published ads => should return ad_id => ad_id can then view application
app.get("/get_published_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        let bearer_token = req.headers.authorization.split(' ')[1];
        let token_search_resp = yield (0, token_1.token_search)(bearer_token);
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
        let get_pub_ads_resp = yield (0, get_pub_ads_1.get_published_ads)(brand_id);
        // console.log(get_pub_ads_resp);
        res.json(get_pub_ads_resp);
    }
}));
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
