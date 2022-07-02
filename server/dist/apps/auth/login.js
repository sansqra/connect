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
exports.login = void 0;
const base_imports_1 = require("../../base_imports");
const token_1 = require("../token");
const login = (email, password, user_type) => __awaiter(void 0, void 0, void 0, function* () {
    switch (user_type) {
        case "br": return brand_login(email, password, user_type);
        case "cr": return creator_login(email, password, user_type);
    }
    ;
});
exports.login = login;
const brand_login = (email, password, user_type) => __awaiter(void 0, void 0, void 0, function* () {
    let brand_find_result = yield base_imports_1.prisma_client.brands.findFirst({
        where: {
            brand_email: email,
            brand_password: password
        }
    });
    // Creating token if brand account exists
    if (brand_find_result === null)
        return { status: null, message: "brand account does not exist" };
    return (0, token_1.create_token)(brand_find_result === null || brand_find_result === void 0 ? void 0 : brand_find_result.brand_id, user_type, email, password);
});
const creator_login = (email, password, user_type) => __awaiter(void 0, void 0, void 0, function* () {
    let creator_find_result = yield base_imports_1.prisma_client.creators.findFirst({
        where: {
            creator_email: email,
            creator_password: password
        }
    });
    // Creating token if creator account exists
    if (creator_find_result === null)
        return { status: null, message: "creator account does not exist" };
    return (0, token_1.create_token)(creator_find_result === null || creator_find_result === void 0 ? void 0 : creator_find_result.creator_id, user_type, email, password);
});
