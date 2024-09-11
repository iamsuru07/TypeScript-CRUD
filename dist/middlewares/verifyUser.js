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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const enums_1 = require("../constants/enums");
const http2_1 = require("http2");
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const dbUtils_1 = require("../utils/dbUtils");
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const verifyUser = async (req, reply) => {
    const tokenResponse = await verifyToken(req);
    if (tokenResponse.code === http2_1.constants.HTTP_STATUS_OK) {
        return;
    }
    const response = {
        status: tokenResponse.status,
        message: tokenResponse.message
    };
    return reply.code(tokenResponse.code).send(response);
};
exports.verifyUser = verifyUser;
const verifyToken = async (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return {
                status: enums_1.StatusResponseEnum.FAILED,
                code: http2_1.constants.HTTP_STATUS_NOT_FOUND,
                message: enums_1.MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
            };
        }
        try {
            const decoded = await jwt.verify(token, SECRET_KEY);
            const auth = await dbUtils_1.User.findOne({ where: { id: decoded.id } });
            if (auth) {
                if (decoded.id === auth.id && decoded.username === auth.username) {
                    return {
                        code: http2_1.constants.HTTP_STATUS_OK,
                        status: enums_1.StatusResponseEnum.SUCCESS,
                        message: enums_1.MessageResponseEnum.AUTHORIZED_USER
                    };
                }
            }
            return {
                code: http2_1.constants.HTTP_STATUS_UNAUTHORIZED,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.UNAUTHORIZED_USER
            };
        }
        catch (error) {
            return {
                code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                status: enums_1.StatusResponseEnum.FAILED,
                message: error
            };
        }
    }
    else {
        return {
            status: enums_1.StatusResponseEnum.FAILED,
            code: http2_1.constants.HTTP_STATUS_NOT_FOUND,
            message: enums_1.MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
        };
    }
};
