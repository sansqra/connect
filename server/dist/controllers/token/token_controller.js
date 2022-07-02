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
exports.get_user_type_from_assoc_values = exports.c_token_assoc_values = void 0;
const token_1 = require("../../apps/token");
// Checks if token is valid
const c_token_assoc_values = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, token_1.token_search)(token); });
exports.c_token_assoc_values = c_token_assoc_values;
// @ts-ignore
const get_user_type_from_assoc_values = (token) => __awaiter(void 0, void 0, void 0, function* () { var _a; return yield ((_a = (0, token_1.token_search)(token)) === null || _a === void 0 ? void 0 : _a.user_type); });
exports.get_user_type_from_assoc_values = get_user_type_from_assoc_values;
