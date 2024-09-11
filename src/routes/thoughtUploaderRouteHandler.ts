import { FastifyReply, FastifyRequest } from "fastify";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { createPostController, getAllPostController } from "../controllers/postController";

interface RequestBody {
    id: number,
    content: string;
    category: string;
}

interface responseDataObject {
    code: number,
    status: string,
    message: string,
}

interface ReplyBody {
    status: string;
    message: string | any;
    data?: Array<Object>
}

export const createPosthandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    const reqBody = req.body;

    const id: number = reqBody.id
    const content: string = reqBody.content
    const category: string = reqBody.category

    if (!id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.ID_IS_NOT_PROVIDED,
        })
    }

    if (!category) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.CATEGORY_IS_NOT_PROVIDED,
        })
    }

    if (!content) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.CONTENT_IS_NOT_PROVIDED,
        })
    }

    try {
        const responseData: responseDataObject = await createPostController(id, category, content);

        let response: ReplyBody = {
            status: responseData.status,
            message: responseData.message
        }

        return reply.code(responseData.code).send(response)
    } catch (error) {
        let response: ReplyBody = {
            status: StatusResponseEnum.FAILED,
            message: error
        }

        return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response)
    }
}

export const getAllPosts = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const response = await getAllPostController();
        return reply.code(200).send(response)
    } catch (error) {
        let response: ReplyBody = {
            status: StatusResponseEnum.FAILED,
            message: error
        }

        return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(response)
    }
}