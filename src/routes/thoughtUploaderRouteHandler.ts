import { FastifyReply, FastifyRequest } from "fastify";
import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { createPostController, deletePostController, getAllPostController, getPostByFilterController, updatePostController } from "../controllers/postController";
import { ThoughtRouteHandlerReplyBody, ThoughtRouteHandlerRequestBody, ThoughtRouteHandlerRequestQuery, ThoughtRouteHandlerResponseDataObject } from "../constants/types";

export const createPosthandler = async (req: FastifyRequest<{ Body: ThoughtRouteHandlerRequestBody }>, reply: FastifyReply): Promise<ThoughtRouteHandlerReplyBody> => {
    const reqBody: ThoughtRouteHandlerRequestBody = req.body;

    const { id, content, category }: ThoughtRouteHandlerRequestBody = reqBody

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

    const responseData: ThoughtRouteHandlerResponseDataObject = await createPostController(id, category, content);

    let response: ThoughtRouteHandlerReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}

export const getAllPostsHandler = async (req: FastifyRequest, reply: FastifyReply): Promise<ThoughtRouteHandlerReplyBody> => {
    const responseData: ThoughtRouteHandlerResponseDataObject = await getAllPostController();

    let response: ThoughtRouteHandlerReplyBody = {
        status: responseData.status,
        data: responseData.data
    }

    return reply.code(responseData.code).send(response)
}

export const getPostsByFilterHandler = async (req: any, reply: FastifyReply): Promise<ThoughtRouteHandlerReplyBody> => {
    const { id, category, username }: ThoughtRouteHandlerRequestQuery = req.query
    if (!id && !category && !username) {
        reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.ALL_PARAMS_ARE_EMPTY
        })
    }

    const responseData: ThoughtRouteHandlerResponseDataObject = await getPostByFilterController(Number(id), category, username);

    let response: ThoughtRouteHandlerReplyBody = {
        status: responseData.status,
        data: responseData.data,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response);
}

export const updatePostHandler = async (req: FastifyRequest<{ Body: ThoughtRouteHandlerRequestBody }>, reply: FastifyReply): Promise<ThoughtRouteHandlerReplyBody> => {
    const { id, post_id, content, category }: ThoughtRouteHandlerRequestBody = req.body

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

    const responseData: ThoughtRouteHandlerResponseDataObject = await updatePostController(post_id, category, content);

    let response: ThoughtRouteHandlerReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}

export const deletePostHandler = async (req: FastifyRequest<{ Body: ThoughtRouteHandlerRequestBody }>, reply: FastifyReply): Promise<ThoughtRouteHandlerReplyBody> => {
    const { post_id }: ThoughtRouteHandlerRequestBody = req.body;
    if (!post_id) {
        return reply.code(constants.HTTP_STATUS_BAD_REQUEST).send({
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.POST_ID_IS_NOT_PROVIDED,
        })
    }

    const responseData: ThoughtRouteHandlerResponseDataObject = await deletePostController(post_id);

    let response: ThoughtRouteHandlerReplyBody = {
        status: responseData.status,
        message: responseData.message
    }

    return reply.code(responseData.code).send(response)
}