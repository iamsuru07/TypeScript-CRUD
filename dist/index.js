"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv = __importStar(require("dotenv"));
const http2_1 = require("http2");
dotenv.config();
const dbUtils_1 = require("./utils/dbUtils");
const routes_1 = __importDefault(require("./routes"));
const PORT = Number(process.env.PORT) || 3000;
const startServer = async () => {
    await (0, dbUtils_1.connectToDatabase)();
    const server = (0, fastify_1.default)({
        logger: true,
    });
    server.get('/', (req, reply) => {
        reply.code(http2_1.constants.HTTP_STATUS_OK).send({ message: "Welcome to the CRUD API" });
    });
    server.register(routes_1.default, { prefix: '/api' });
    server.listen({ port: PORT }, (err) => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
        else {
            server.log.info(`Attribution service server running`, {
                data: {
                    payload: {
                        port: PORT
                    }
                },
            });
        }
    });
};
startServer();
