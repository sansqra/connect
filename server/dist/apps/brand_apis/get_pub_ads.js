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
exports.get_published_ads = void 0;
const base_imports_1 = require("../../base_imports");
const index_types_1 = require("../token/index.types");
const get_published_ads = (brand_id) => __awaiter(void 0, void 0, void 0, function* () {
    let get_published_ads_resp = yield base_imports_1.prisma_client.adverts.findMany({
        where: {
            brand_id: brand_id
        }
    });
    if (get_published_ads_resp === null ||
        get_published_ads_resp === undefined) {
        return {
            status: "null",
            "message": "Brand has not published any ads"
        };
    }
    return {
        status: index_types_1.not_null,
        message: "brand has published ads",
        ads: get_published_ads_resp
    };
});
exports.get_published_ads = get_published_ads;
