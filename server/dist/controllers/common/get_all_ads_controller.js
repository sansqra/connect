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
exports.c_get_all_ads_sequence = void 0;
const get_all_ads_1 = require("../../apps/common/get_all_ads");
const token_controller_1 = require("../token/token_controller");
const c_get_all_ads_sequence = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.headers.authorization && req.headers.authorization.length > 10) {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        let token_assoc_status = yield (0, token_controller_1.c_token_assoc_values)(token);
        if (token_assoc_status.status == 401) {
            return {
                status: 400,
                message: "Invalid token"
            };
        }
        let all_ads_obj = yield (0, get_all_ads_1.get_all_ads)();
        return {
            status: 200,
            message: "returning all ads from db",
            ad_list: Object.assign({}, all_ads_obj)
        };
    }
    // no token provided
    return {
        status: 400,
        message: "Not an auth token"
    };
});
exports.c_get_all_ads_sequence = c_get_all_ads_sequence;
