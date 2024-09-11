"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./userRoutes"));
const thoughtUploaderRoutes_1 = __importDefault(require("./thoughtUploaderRoutes"));
const routes = async (fastify) => {
    await (0, userRoutes_1.default)(fastify);
    await (0, thoughtUploaderRoutes_1.default)(fastify);
};
exports.default = routes;
