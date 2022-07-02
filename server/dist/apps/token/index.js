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
const crypto_1 = __importDefault(require("crypto"));
const user_types_1 = require("../../user.types");
// Search for token to prevent calling the Auth APIs
const token_search = (token_value) => __awaiter(void 0, void 0, void 0, function* () {
    let token_result = yield base_imports_1.prisma_client.token.findFirst({
        where: {
            token_value: token_value
        }
    });
    // user needs to login
    if (token_result === null) {
        return {
            status: 401
        };
    }
    // sucessful login
    return Object.assign({ status: 200 }, token_result);
});
exports.token_search = token_search;
// Create token credential check
const create_token = (user_id, user_type, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // creating token by hashing function parameters
    let token = crypto_1.default.createHash("sha256")
        .update(JSON.stringify({ email, password }))
        .digest("hex");
    let token_search_result = yield (0, exports.token_search)(token);
    // If token exist, return object, don't insert
    if (token_search_result.status === 200) {
        return token_search_result;
    }
    // if user has not logged i.e token not created
    if (user_type == user_types_1.BRAND) {
        yield base_imports_1.prisma_client.token.create({
            data: {
                token_value: token,
                user_type: user_type,
                brands: {
                    connect: {
                        brand_id: user_id
                    }
                }
            }
        });
    }
    if (user_type == user_types_1.CREATOR) {
        yield base_imports_1.prisma_client.token.create({
            data: {
                token_value: token,
                user_type: user_type,
                creators: {
                    connect: {
                        creator_id: user_id
                    }
                }
            }
        });
    }
    ;
    // to return a consistent message object upon creation or error
    return yield (0, exports.token_search)(token);
});
exports.create_token = create_token;
// Delete token aka Logout
const delete_token = (token_value) => __awaiter(void 0, void 0, void 0, function* () {
    let token_present_status = yield (0, exports.token_search)(token_value);
    // If token exists delete
    if (token_present_status.status === 200) {
        yield base_imports_1.prisma_client.token.delete({
            where: {
                token_value: token_value
            }
        });
    }
    // to return a consistent message object
    return yield (0, exports.token_search)(token_value);
});
exports.delete_token = delete_token;
