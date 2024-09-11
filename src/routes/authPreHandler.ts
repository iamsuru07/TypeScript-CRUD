import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../helper/generateToken";
import { constants } from "http2";

export const authPreHandler = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {
    try {
        const isVerifiedToken = await verifyToken(req, reply);
        if (isVerifiedToken?.code === constants.HTTP_STATUS_OK) {
            return;
        }

        const response = {
            status: isVerifiedToken?.status,
            message: isVerifiedToken?.message
        }
        return reply.code(isVerifiedToken?.code!).send(response);
    } catch (error) {
        console.log(error)
        return reply.code(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
    }

}