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
Object.defineProperty(exports, "__esModule", { value: true });
exports.c_get_all_pubished_ad_sequence = void 0;
const get_pub_ads_1 = require("../../../apps/brand_apis/get_pub_ads");
const token_controller_1 = require("../../../controllers/token/token_controller");
const user_types_1 = require("../../../user.types");
const c_get_all_pubished_ad_sequence = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.headers.authorization && req.headers.authorization.length > 10) {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        let token_assoc_status = yield (0, token_controller_1.c_token_assoc_values)(token);
        console.log(token_assoc_status);
        if (token_assoc_status.status == 401) {
            return {
                status: 400,
                message: "Invalid token"
            };
        }
        let user_type;
        if (token_assoc_status.status == 200) {
            // @ts-ignore
            user_type = token_assoc_status === null || token_assoc_status === void 0 ? void 0 : token_assoc_status.user_type;
            console.log(user_type);
        }
        if (user_type == user_types_1.CREATOR) {
            return {
                status: 400,
                message: "user is not brand"
            };
        }
        // @ts-ignore
        let brand_id = token_assoc_status.id_brand;
        let published_ads_resp = yield (0, get_pub_ads_1.get_published_ads)(brand_id);
        return published_ads_resp;
    }
    return {
        status: 400,
        message: "Not an auth token"
    };
});
exports.c_get_all_pubished_ad_sequence = c_get_all_pubished_ad_sequence;
