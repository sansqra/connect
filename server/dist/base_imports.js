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
exports.prisma_disconnect = exports.prisma_client = void 0;
const client_1 = require("@prisma/client");
exports.prisma_client = new client_1.PrismaClient();
const prisma_disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma_client.$disconnect();
    console.log("Prima connection disconnected");
});
exports.prisma_disconnect = prisma_disconnect;
