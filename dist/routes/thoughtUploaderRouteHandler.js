"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.createPosthandler = void 0;
const http2_1 = require("http2");
const enums_1 = require("../constants/enums");
const postController_1 = require("../controllers/postController");
const createPosthandler = async (req, reply) => {
    const reqBody = req.body;
    const id = reqBody.id;
    const content = reqBody.content;
    const category = reqBody.category;
    if (!id) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.ID_IS_NOT_PROVIDED,
        });
    }
    if (!category) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.CATEGORY_IS_NOT_PROVIDED,
        });
    }
    if (!content) {
        return reply.code(http2_1.constants.HTTP_STATUS_BAD_REQUEST).send({
            status: enums_1.StatusResponseEnum.FAILED,
            message: enums_1.MessageResponseEnum.CONTENT_IS_NOT_PROVIDED,
        });
    }
    try {
        const responseData = await (0, postController_1.createPostController)(id, category, content);
        let response = {
            status: responseData.status,
            message: responseData.message
        };
        return reply.code(responseData.code).send(response);
    }
    catch (error) {
        let response = {
            status: enums_1.StatusResponseEnum.FAILED,
            message: error
        };
        return reply.code(http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};
exports.createPosthandler = createPosthandler;
const getAllPosts = async (req, reply) => {
    try {
        const response = await (0, postController_1.getAllPostController)();
        return reply.code(200).send(response);
    }
    catch (error) {
        let response = {
            status: enums_1.StatusResponseEnum.FAILED,
            message: error
        };
        return reply.code(http2_1.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response);
    }
};
exports.getAllPosts = getAllPosts;
