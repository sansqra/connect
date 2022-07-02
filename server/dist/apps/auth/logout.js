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
exports.logout = void 0;
const token_1 = require("../token");
const index_types_1 = require("../token/index.types");
const logout = (token_value) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, token_1.delete_token)(token_value);
    return {
        status: index_types_1.not_null,
        message: "user has been logged out"
    };
});
exports.logout = logout;
