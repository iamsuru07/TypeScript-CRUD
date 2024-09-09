"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.loginController = exports.signUpController = void 0;
const dbUtils_1 = require("../utils/dbUtils");
const http2_1 = require("http2");
const enums_1 = require("../constants/enums");
const passwordHasher_1 = require("../helper/passwordHasher");
const generateToken_1 = require("../helper/generateToken");
const signUpController = async (username, password) => {
    try {
        // Check if user exists
        const isUserExists = await dbUtils_1.User.findOne({ where: { username } });
        if (isUserExists) {
            return {
                code: http2_1.constants.HTTP_STATUS_CONFLICT,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.USERNAME_ALREADY_EXISTS,
            };
        }
        const hashedPassword = await (0, passwordHasher_1.passwordHasher)(password);
        // Create a new user
        const response = await dbUtils_1.User.create({ username: username, password: hashedPassword });
        if (response) {
            return {
                code: http2_1.constants.HTTP_STATUS_CREATED,
                status: enums_1.StatusResponseEnum.SUCCESS,
                message: enums_1.MessageResponseEnum.USER_CREATED_SUCCESSFULLY,
            };
        }
        return {
            code: http2_1.constants.HTTP_STATUS_BAD_REQUEST,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.USER_CREATED_SUCCESSFULLY,
        };
    }
    catch (error) {
        return {
            code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};
exports.signUpController = signUpController;
const loginController = async (username, password) => {
    try {
        const auth = await dbUtils_1.User.findOne({ where: { username } });
        if (!auth) {
            return {
                code: http2_1.constants.HTTP_STATUS_NOT_FOUND,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }
        const comparePassword = await (0, passwordHasher_1.passwordMatcher)(password, auth.password);
        if (!comparePassword) {
            return {
                code: http2_1.constants.HTTP_STATUS_UNAUTHORIZED,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }
        const token = await (0, generateToken_1.generateJWTToken)(auth.id, auth.username);
        return {
            code: http2_1.constants.HTTP_STATUS_OK,
            status: enums_1.StatusResponseEnum.SUCCESS,
            message: enums_1.MessageResponseEnum.AUTHENTICATION_SUCCESSFUL,
            token: token
        };
    }
    catch (error) {
        return {
            code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};
exports.loginController = loginController;
const changePasswordController = async (username, password, newPassword) => {
    try {
        const auth = await dbUtils_1.User.findOne({ where: { username } });
        if (!auth) {
            return {
                code: http2_1.constants.HTTP_STATUS_NOT_FOUND,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.USER_DOES_NOT_EXISTS,
            };
        }
        const comparePassword = await (0, passwordHasher_1.passwordMatcher)(password, auth.password);
        if (!comparePassword) {
            return {
                code: http2_1.constants.HTTP_STATUS_UNAUTHORIZED,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.INAVLID_CREDENTIALS,
            };
        }
        const hashedPassword = await (0, passwordHasher_1.passwordHasher)(newPassword);
        const updatedAuth = await dbUtils_1.User.update({ password: hashedPassword }, { where: { username } });
        if (!updatedAuth) {
            return {
                code: http2_1.constants.HTTP_STATUS_BAD_GATEWAY,
                status: enums_1.StatusResponseEnum.FAILED,
                message: enums_1.MessageResponseEnum.PASSWORD_NOT_UPDATED,
            };
        }
        return {
            code: http2_1.constants.HTTP_STATUS_OK,
            status: enums_1.StatusResponseEnum.SUCCESS,
            message: enums_1.MessageResponseEnum.PASSWORD_UPDATED_SUCCESSFULLY,
        };
    }
    catch (error) {
        return {
            code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.INTERNAL_SERVER_ERROR,
        };
    }
};
exports.changePasswordController = changePasswordController;
