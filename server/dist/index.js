"use strict";
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
// SERVER IMPORTS
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_types_1 = require("./index.types");
// APPS
const login_1 = require("./apps/auth/login");
const logout_1 = require("./apps/auth/logout");
const token_1 = require("./apps/token");
// BRAND API imports
const publish_ads_1 = require("./apps/brand_apis/publish_ads");
dotenv_1.default.config();
// Configuring base
const app = (0, express_1.default)();
// Using bodyparser
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// setting port from .env
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.json({
        server: "ok"
    });
});
// Route to Brand_Login
app.post("/brand_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    let password = req.body.password;
    let log_res = yield (0, login_1.login)(email, password, index_types_1.BRAND);
    res.json(JSON.stringify(log_res));
}));
// Route to Creator_login
app.post("/creator_login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let email = req.body.email;
    let password = req.body.password;
    let log_res = yield (0, login_1.login)(email, password, index_types_1.CREATOR);
    res.json(JSON.stringify(log_res));
}));
// Route to logout | change to app.delete
app.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token_value_from_req = req.body.token_value;
    let logout_res = yield (0, logout_1.logout)(token_value_from_req);
    res.json(logout_res);
}));
// BRAND APIS
// app.post("/brand_publish_ads") => {header: token}
app.post("/brand_publish_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if auth exists
    if (req.headers.authorization) {
        // getting the token
        let bearer_token = req.headers.authorization.split(' ')[1];
        let token_search_resp = yield (0, token_1.token_search)(bearer_token);
        console.log(token_search_resp);
        // that field was giving some error, didn't find it compelling to fix the type immediately
        // @ts-ignore
        let brand_id = token_search_resp.id_brand;
        // brand has not logged in
        if (token_search_resp.status === "null") {
            res.json(JSON.stringify({ status: "null", message: "brand must first login" }));
            // have to return else it executes the code below and tries to create the add with invalid token
            return;
        }
        let publish_ad_resp = yield (0, publish_ads_1.publish_ad)(req.body.advert_name, req.body.advert_description, brand_id);
        res.json(publish_ad_resp);
    }
}));
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
