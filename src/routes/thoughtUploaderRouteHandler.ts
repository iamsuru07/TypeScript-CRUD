import { FastifyReply, FastifyRequest } from "fastify";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { createPostController, deletePostController, getAllPostController, getPostByFilterController, updatePostController } from "../controllers/postController";
import { QueryResult } from "mysql2";

interface RequestBody {
    id: number,
    post_id: number,
    content?: string;
    category?: string;
}

interface RequestQuery {
    id: number,
    category?: string,
    username?: string
}
interface ResponseDataObject {
    code: number,
    status: string,
    message?: string,
    data?: Array<Object> | QueryResult
}

interface ReplyBody {
    status: string;
    message?: string | any;
    data?: Array<Object> | QueryResult
}

export const createPosthandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const reqBody: RequestBody = req.body;

    const { id, content, category }: RequestBody = reqBody

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

    const responseData: ResponseDataObject = await createPostController(id, category, content);

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}

export const getAllPostsHandler = async (req: FastifyRequest, reply: FastifyReply): Promise<ReplyBody> => {
    const responseData: ResponseDataObject = await getAllPostController();

    let response: ReplyBody = {
        status: responseData.status,
        data: responseData.data
    }

    return reply.code(responseData.code).send(response)
}

export const getPostsByFilterHandler = async (req: any, reply: FastifyReply): Promise<ReplyBody> => {
    const { id, category, username }: RequestQuery = req.query
    if (!id && !category && !username) {
        reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.ALL_PARAMS_ARE_EMPTY
        })
    }

    const responseData: ResponseDataObject = await getPostByFilterController(Number(id), category, username);

    let response: ReplyBody = {
        status: responseData.status,
        data: responseData.data,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response);
}

export const updatePostHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const { id, post_id, content, category }: RequestBody = req.body

    if (!id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.ID_IS_NOT_PROVIDED,
        })
    }

    if (!post_id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.POST_ID_IS_NOT_PROVIDED,
        })
    }

    if (!content && !category) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: `${MessageResponseEnum.CATEGORY_IS_NOT_PROVIDED} & ${MessageResponseEnum.CONTENT_IS_NOT_PROVIDED} BOTH ARE NOT PROVIDED`,
        })
    }

    const responseData: ResponseDataObject = await updatePostController(post_id, category, content);

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}

export const deletePostHandler = async (req: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply): Promise<ReplyBody> => {
    const { post_id }: RequestBody = req.body;
    if (!post_id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.POST_ID_IS_NOT_PROVIDED,
        })
    }

    const responseData: ResponseDataObject = await deletePostController(post_id);

    let response: ReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}