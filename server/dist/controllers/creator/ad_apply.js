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
exports.c_creator_ad_apply_sequence = void 0;
const token_controller_1 = require("../token/token_controller");
const user_types_1 = require("../../user.types");
const apply_to_ad_1 = require("../../apps/creator_apis/apply_to_ad");
const c_creator_ad_apply_sequence = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
        let user_type;
        if (token_assoc_status.status == 200) {
            // @ts-ignore
            user_type = token_assoc_status === null || token_assoc_status === void 0 ? void 0 : token_assoc_status.user_type;
            console.log(user_type);
        }
        if (user_type == user_types_1.BRAND) {
            return {
                status: 400,
                message: "user is not creator"
            };
        }
        // Extracting ids
        let advert_id = req.body.advert_id;
        // @ts-ignore
        let creator_id = token_assoc_status === null || token_assoc_status === void 0 ? void 0 : token_assoc_status.id_creator;
        // Submitting application
        let application_obj = yield (0, apply_to_ad_1.apply_to_ad)(advert_id, creator_id);
        return {
            status: 200,
            message: "returning all ads from db",
            application: Object.assign({}, application_obj)
        };
    }
    // no token provided
    return {
        status: 400,
        message: "Not an auth token"
    };
});
exports.c_creator_ad_apply_sequence = c_creator_ad_apply_sequence;
