"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordHandler = exports.loginHandler = exports.signUpHandler = void 0;
const http2_1 = require("http2");
const enums_1 = require("../constants/enums");
const userController_1 = require("../controllers/userController");
const signUpHandler = async (req, reply) => {
    try {
        const reqBody = req.body;
        const username = reqBody.username;
        const password = reqBody.password;
        if (!username) {
            return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.USERNAME_IS_REQUIRED
            });
        }
        if (!password) {
            return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.PASSWORD_IS_REQUIRED
            });
        }
        const responseData = await (0, userController_1.signUpController)(username, password);
        let response = {
            status: responseData.status,
            message: responseData.message
        };
        return reply.code(responseData.code).send(response);
    }
    catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = String(error);
        }
        const response = {
            status: enums_1.StatusResponseEnum.FAILED,
            message: errorMessage,
        };
        return reply.code(http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};
exports.signUpHandler = signUpHandler;
const loginHandler = async (req, reply) => {
    try {
        const reqBody = req.body;
        const username = reqBody.username;
        const password = reqBody.password;
        if (!username) {
            return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.USERNAME_IS_REQUIRED
            });
        }
        if (!password) {
            return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.PASSWORD_IS_REQUIRED
            });
        }
        const responseData = await (0, userController_1.loginController)(username, password);
        let response = {
            status: responseData.status,
            message: responseData.message,
            token: responseData.token
        };
        return reply.code(responseData.code).send(response);
    }
    catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        else {
            errorMessage = String(error);
        }
        const response = {
            status: enums_1.StatusResponseEnum.FAILED,
            message: errorMessage,
        };
        return reply.code(http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};
exports.loginHandler = loginHandler;
const changePasswordHandler = async (req, reply) => {
    const reqBody = req.body;
    const username = reqBody.username;
    const password = reqBody.password;
    const newPassword = reqBody.newPassword;
    if (!username) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.USERNAME_IS_REQUIRED
        });
    }
    if (!password) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.PASSWORD_IS_REQUIRED
        });
    }
    if (!newPassword) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.NEW_PASSWORD_IS_REQUIRED
        });
    }
    if (password === newPassword) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.PASSWORD_CANNOT_BE_SAME
        });
    }
    const responseData = await (0, userController_1.changePasswordController)(username, password, newPassword);
    let response = {
        status: responseData.status,
        message: responseData.message
    };
    return reply.code(responseData.code).send(response);
};
exports.changePasswordHandler = changePasswordHandler;
