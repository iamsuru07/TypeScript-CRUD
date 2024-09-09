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
exports.verifyToken = exports.generateJWTToken = void 0;
const dotenv = __importStar(require("dotenv"));
const jwt = __importStar(require("jsonwebtoken"));
const dbUtils_1 = require("../utils/dbUtils");
const enums_1 = require("../constants/enums");
const http2_1 = require("http2");
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const generateJWTToken = async (id, username) => {
    let generateToken = "";
    try {
        generateToken = await jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '24h' });
    }
    catch (error) {
        console.log(error);
    }
    return generateToken;
};
exports.generateJWTToken = generateJWTToken;
const verifyToken = async (req, reply) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, SECRET_KEY);
            const auth = await dbUtils_1.User.findOne({ where: { id: decoded.id } });
            if (!auth) {
                return {
                    code: http2_1.constants.HTTP_STATUS_UNAUTHORIZED,
                    status: enums_1.StatusResponseEnum.FAILED,
                    message: enums_1.MessageResponseEnum.UNAUTHORIZED_USER
                };
            }
            return {
                code: http2_1.constants.HTTP_STATUS_OK,
                status: enums_1.StatusResponseEnum.SUCCESS,
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
    if (!token) {
        return {
            code: http2_1.constants.HTTP_STATUS_BAD_REQUEST,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.NO_ACCESS_TOKEN_PROVIDED
        };
    }
};
exports.verifyToken = verifyToken;
