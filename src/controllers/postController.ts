import { constants } from "http2";
import { MessageResponseEnum, StatusResponseEnum } from "../constants/enums";
import { Post } from "../utils/dbUtils";

interface ReplyBody {
    code: number;
    status: string;
    message: string | any;
    data?: Array<Object>
}

export const createPostController = async (id: number, category: string, content: string): Promise<ReplyBody> => {
    console.log("reaching")
    try {
        const response = await Post.create({ user_id: id, category: category, content: content })
        if (response) {
            return {
                code: constants.HTTP_STATUS_CREATED,
                status: StatusResponseEnum.SUCCESS,
                message: MessageResponseEnum.UPLOADED_SUCCESSFULLY
            }
        }
        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            status: StatusResponseEnum.FAILED,
            message: MessageResponseEnum.UNABLE_TO_POST,
        };
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: error
        }
    }
}

export const getAllPostController = async () => {
    let data = [];
    try {
        const response = await Post.findAll();

        console.log(response)

        return response;
    } catch (error) {
        return {
            code: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            status: StatusResponseEnum.FAILED,
            message: error
        }
    }
}