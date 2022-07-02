"use strict";
// IMPORTS
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// -- SERVER --
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var dotenv_1 = require("dotenv");
var swaggerUI = require("swagger-ui-express");
// enanling json module
var swaggerDocument = require("./swagger.json");
var user_types_1 = require("./controllers/user.types");
// -- --
// -- CONTROLLERS --
// > AUTH CONTROLLERS
var brand_login_controller_1 = require("./controllers/auth/login/brand_login_controller");
var creator_login_controller_1 = require("./controllers/auth/login/creator_login_controller");
var logout_controller_1 = require("./controllers/auth/logout/logout_controller");
// take this outta here
var token_1 = require("./apps/token");
// BRAND API imports
var get_pub_ads_1 = require("./apps/brand_apis/get_pub_ads");
var token_controller_1 = require("./controllers/token/token_controller");
var publish_ads_controller_1 = require("./controllers/brand/ads/publish_ads_controller");
dotenv_1["default"].config();
// Configuring base
var app = (0, express_1["default"])();
// Using custom middleware
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// setting port from .env
var port = process.env.PORT;
app.get("/", function (req, res) {
    res.json({
        server: "Welcome to ConnectServer!"
    });
});
// -- AUTH ROUTES --
// Route to Brand_Login
app.post("/brand_login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, (0, brand_login_controller_1.c_login_with_brand)(req.body.email, req.body.password)];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
app.post("/brand_login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, (0, brand_login_controller_1.c_login_with_brand)(req.body.email, req.body.password)];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
// Route to Creator_login
app.post("/creator_login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, (0, creator_login_controller_1.c_login_with_creator)(req.body.email, req.body.password)];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
// Route to logout | Token in Header
app.post("/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c; return __generator(this, function (_d) {
    switch (_d.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, (0, logout_controller_1.c_logout)((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1])];
        case 1: return [2 /*return*/, _b.apply(_a, [_d.sent()])];
    }
}); }); });
// BRAND APIS
// app.post("/brand_publish_ads") => {header: token}
app.post("/brand_publish_ads", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, token_assoc_values, advert_name, advert_description, brand_id, publish_ad_response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization) return [3 /*break*/, 4];
                token = req.headers.authorization.split(' ')[1];
                return [4 /*yield*/, (0, token_controller_1.c_token_assoc_values)(token)];
            case 1:
                token_assoc_values = _a.sent();
                // Brand has not logged in | invalid token | brand account not created
                if (token_assoc_values.status == 401) {
                    // first value of spread will return status
                    res.json(__assign(__assign({}, token_assoc_values), { message: "Brand has not logged in | invalid token | brand account not created" }));
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, token_controller_1.get_user_type_from_assoc_values)(token)];
            case 2:
                // if token_assoc_values.status == 200
                // If user is creator, rejecting request
                if ((_a.sent()) == user_types_1.CREATOR) {
                    res.json({
                        status: 400,
                        message: "user is not brand"
                    });
                    return [2 /*return*/];
                }
                advert_name = req.body.advert_name;
                advert_description = req.body.advert_description;
                brand_id = token_assoc_values === null || token_assoc_values === void 0 ? void 0 : token_assoc_values.id_brand;
                return [4 /*yield*/, (0, publish_ads_controller_1.c_publish_ads)(advert_name = advert_name, advert_description = advert_description, brand_id = brand_id)];
            case 3:
                publish_ad_response = _a.sent();
                // Checking if ad was created or not
                if (publish_ad_response.status == 401) {
                    res.json(JSON.stringify(publish_ad_response));
                    return [2 /*return*/];
                }
                // Ad was succesfully published
                res.json(JSON.stringify(publish_ad_response));
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// app.get() get all published ads => should return ad_id => ad_id can then view application
app.get("/get_published_ads", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer_token, token_search_resp, brand_id, get_pub_ads_resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization) return [3 /*break*/, 3];
                bearer_token = req.headers.authorization.split(' ')[1];
                return [4 /*yield*/, (0, token_1.token_search)(bearer_token)];
            case 1:
                token_search_resp = _a.sent();
                console.log(token_search_resp);
                brand_id = token_search_resp.id_brand;
                if (token_search_resp.status === null) {
                    res.json({
                        status: "null",
                        message: "brand cannot view the ads requested for and must login first"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, get_pub_ads_1.get_published_ads)(brand_id)];
            case 2:
                get_pub_ads_resp = _a.sent();
                // console.log(get_pub_ads_resp);
                res.json(get_pub_ads_resp);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
// app.get() get all applications for ad where ad = ad_id
// app.get() get all creator profiles
// CREATOR APIS
// app.get("/get_ads") => {header: token} | Gets all the ads available in db
app.get("/get_all_ads", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bearer_token, token_search_resp, brand_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.headers.authorization) return [3 /*break*/, 2];
                bearer_token = req.headers.authorization.split(' ')[1];
                return [4 /*yield*/, (0, token_1.token_search)(bearer_token)];
            case 1:
                token_search_resp = _a.sent();
                console.log(token_search_resp);
                brand_id = token_search_resp.id_brand;
                if (token_search_resp.status === null) {
                    res.json({
                        status: "null",
                        message: "brand cannot view the ads requested for and must login first"
                    });
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
// app.put("/creator_apply_to_ad") => {header: token}
// app.put("/view_applications") | applications where creator_id =
// GENERIC APIS
// app.get("/get_ads") | Get ad where id = ad_id
// this will be used when creator clicks on single ad for info
app.listen(port, function () {
    console.log('\x1b[36m%s\x1b[0m', "Server listening @ localhost:" + port);
});
