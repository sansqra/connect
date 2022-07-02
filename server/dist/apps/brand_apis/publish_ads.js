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
exports.publish_ad = void 0;
const base_imports_1 = require("../../base_imports");
const index_types_1 = require("../token/index.types");
const publish_ad = (advert_name, advert_description, brand_id) => __awaiter(void 0, void 0, void 0, function* () {
    let publish_ad_resp = yield base_imports_1.prisma_client.adverts.create({
        data: {
            advert_name: advert_name,
            advert_description: advert_description,
            brands: {
                connect: {
                    brand_id: brand_id
                }
            }
        }
    });
    console.log(publish_ad_resp);
    return (publish_ad_resp === null)
        ? { status: null, message: "could not publish ad" }
        : { status: index_types_1.not_null, message: "ad created", ad_obj: Object.assign({}, publish_ad_resp) };
});
exports.publish_ad = publish_ad;
