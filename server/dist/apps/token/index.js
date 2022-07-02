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
exports.delete_token = exports.create_token = exports.token_search = void 0;
const base_imports_1 = require("../../base_imports");
const index_types_1 = require("./index.types");
const crypto_1 = __importDefault(require("crypto"));
const index_types_2 = require("../../index.types");
// Search for token to prevent calling the Auth APIs
const token_search = (token_value) => __awaiter(void 0, void 0, void 0, function* () {
    let token_result = yield base_imports_1.prisma_client.token.findFirst({
        where: {
            token_value: token_value
        }
    });
    // user needs to login
    if (token_result === null) {
        return { status: "null" };
    }
    switch (token_result) {
        case null: return {
            status: "null"
        };
        default: return Object.assign({ status: index_types_1.not_null }, token_result);
    }
});
exports.token_search = token_search;
// Create token post login
const create_token = (user_id, user_type, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // creating by hashing function parameters
    let token_value = crypto_1.default.createHash("sha256")
        .update(JSON.stringify({ email, password }))
        .digest("hex");
    let token_search_result = yield (0, exports.token_search)(token_value);
    if (token_search_result.status === index_types_1.not_null) {
        return token_search_result;
    }
    // if user has not logged i.e token not created
    let token_obj;
    if (user_type == index_types_2.BRAND) {
        token_obj = yield base_imports_1.prisma_client.token.create({
            data: {
                token_value: token_value,
                user_type: user_type,
                brands: {
                    connect: {
                        brand_id: user_id
                    }
                }
            }
        });
    }
    else {
        token_obj = yield base_imports_1.prisma_client.token.create({
            data: {
                token_value: token_value,
                user_type: user_type,
                brands: {
                    connect: {
                        brand_id: user_id
                    }
                }
            }
        });
    }
    ;
    return token_obj;
});
exports.create_token = create_token;
// Delete token aka Logout
const delete_token = (token_value) => __awaiter(void 0, void 0, void 0, function* () {
    let token_present_status = yield (0, exports.token_search)(token_value);
    if (token_present_status.status === index_types_1.not_null) {
        yield base_imports_1.prisma_client.token.delete({
            where: {
                token_value: token_value
            }
        });
    }
    // Checking delete status by querying token value, returns an adequate response
    let token_present = yield (0, exports.token_search)(token_value);
    return token_present;
});
exports.delete_token = delete_token;
