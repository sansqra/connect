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
// -- --
// -- CONTROLLERS --
// > AUTH CONTROLLERS
const brand_login_controller_1 = require("./controllers/auth/login/brand_login_controller");
const creator_login_controller_1 = require("./controllers/auth/login/creator_login_controller");
const logout_controller_1 = require("./controllers/auth/logout/logout_controller");
// BRAND API imports
const publish_ads_controller_1 = require("./controllers/brand/ads/publish_ads_controller");
const get_published_ads_controller_1 = require("./controllers/brand/ads/get_published_ads_controller");
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
// API for brands to publish Ads
app.post("/brand_publish_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = yield (0, publish_ads_controller_1.c_publish_ad_sequence)(req);
    if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
    }
}));
app.get("/get_all_published_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = yield (0, get_published_ads_controller_1.c_get_all_pubished_ad_sequence)(req);
    if (resp.status == 400 || resp.status == 401 || resp.status == 200) {
        res.json(resp);
        return;
    }
}));
app.get("/get_all_ads", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', "Server listening @ localhost:" + port);
});
