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
exports.apply_to_ad = void 0;
const base_imports_1 = require("../../base_imports");
const apply_to_ad = (advert_id, creator_id) => __awaiter(void 0, void 0, void 0, function* () {
    let create_application = yield base_imports_1.prisma_client.ad_applications.create({
        data: {
            adverts: {
                connect: {
                    advert_id: advert_id
                }
            },
            creators: {
                connect: {
                    creator_id: creator_id
                }
            }
        }
    });
    return create_application;
});
exports.apply_to_ad = apply_to_ad;
