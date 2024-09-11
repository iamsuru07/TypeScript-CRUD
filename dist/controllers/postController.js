"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPostController = exports.createPostController = void 0;
const http2_1 = require("http2");
const enums_1 = require("../constants/enums");
const dbUtils_1 = require("../utils/dbUtils");
const createPostController = async (id, category, content) => {
    console.log("reaching");
    try {
        const response = await dbUtils_1.Post.create({ user_id: id, category: category, content: content });
        if (response) {
            return {
                code: http2_1.constants.HTTP_STATUS_CREATED,
                status: enums_1.StatusResponseEnum.SUCCESS,
                message: enums_1.MessageResponseEnum.UPLOADED_SUCCESSFULLY
            };
        }
        return {
            code: http2_1.constants.HTTP_STATUS_BAD_REQUEST,
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.UNABLE_TO_POST,
        };
    }
    catch (error) {
        return {
            code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: enums_1.StatusResponseEnum.FAILED,
            message: error
        };
    }
};
exports.createPostController = createPostController;
const getAllPostController = async () => {
    let data = [];
    try {
        const response = await dbUtils_1.Post.findAll();
        console.log(response);
        return response;
    }
    catch (error) {
        return {
            code: http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: enums_1.StatusResponseEnum.FAILED,
            message: error
        };
    }
};
exports.getAllPostController = getAllPostController;
