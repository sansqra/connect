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
exports.c_login_with_brand = void 0;
const login_1 = require("../../../apps/auth/login");
const user_types_1 = require("../../../user.types");
const c_login_with_brand = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let login_with_brand_response = yield (0, login_1.login)(email, password, user_types_1.BRAND);
    return login_with_brand_response;
});
exports.c_login_with_brand = c_login_with_brand;
