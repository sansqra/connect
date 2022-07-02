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
const login = (email, password, type) => __awaiter(void 0, void 0, void 0, function* () {
    switch (type) {
        case "br": return brand_login(email, password);
        case "cr": return creator_login(email, password);
    }
    ;
});
exports.login = login;
const brand_login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let brand_find_result = yield base_imports_1.prisma_client.brands.findFirst({
        where: {
            brand_email: email,
            brand_password: password
        }
    });
    // console.log(brand_find_result);
    return brand_find_result;
});
const creator_login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let creator_find_result = yield base_imports_1.prisma_client.creators.findFirst({
        where: {
            creator_email: email,
            creator_password: password
        }
    });
    return creator_find_result;
});
