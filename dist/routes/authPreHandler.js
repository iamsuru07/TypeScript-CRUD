"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPreHandler = void 0;
const generateToken_1 = require("../helper/generateToken");
const http2_1 = require("http2");
const authPreHandler = async (req, reply, done) => {
    try {
        const isVerifiedToken = await (0, generateToken_1.verifyToken)(req, reply);
        if ((isVerifiedToken === null || isVerifiedToken === void 0 ? void 0 : isVerifiedToken.code) === http2_1.constants.HTTP_STATUS_OK) {
            done();
            return;
        }
        const response = {
            status: isVerifiedToken === null || isVerifiedToken === void 0 ? void 0 : isVerifiedToken.status,
            message: isVerifiedToken === null || isVerifiedToken === void 0 ? void 0 : isVerifiedToken.message
        };
        return reply.code(isVerifiedToken === null || isVerifiedToken === void 0 ? void 0 : isVerifiedToken.code).send(response);
    }
    catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
};
exports.authPreHandler = authPreHandler;
