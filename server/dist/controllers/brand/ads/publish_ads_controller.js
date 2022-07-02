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
exports.c_publish_ads = void 0;
const publish_ads_1 = require("../../../apps/brand_apis/publish_ads");
const c_publish_ads = (advert_name, advert_description, brand_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, publish_ads_1.publish_ad)(advert_name, advert_description, brand_id);
});
exports.c_publish_ads = c_publish_ads;
