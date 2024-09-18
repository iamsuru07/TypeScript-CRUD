import { constants } from "http2"
import { PostControllerReplyBodyObject } from "../constants/types"
import { StatusResponseEnum } from "../constants/enums"

export const errorHandler = (error: any): PostControllerReplyBodyObject => {
    if (error instanceof Error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: error.message
        }
    }

    return {
        code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
        status: StatusResponseEnum.FAILED,
        message: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    }
}