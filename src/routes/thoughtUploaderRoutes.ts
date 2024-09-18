import { FastifyInstance, HTTPMethods } from "fastify"
import { createPosthandler, deletePostHandler, getAllPostsHandler, getPostsByFilterHandler, updatePostHandler } from "./thoughtUploaderRouteHandler"
import { verifyUser } from "../middlewares/verifyUser"
import { authMiddleware } from "../middlewares/authMiddleware"
import { createPostSchema, deletePostSchema, getAllPostSchema, getPostsByFilterSchema, updatePostSchema } from "../routeSchema/thoughtRouteSchema"
const thoughtRouteConfig = [
    {
        url: '/uploader/createPost',
        method: 'POST' as HTTPMethods,
        schema: createPostSchema,
        preHandler: [authMiddleware, verifyUser],
        handler: createPosthandler
    },
    //no preHandler required as a normal user can access it without sign in.It is open for non auth user also
    {
        url: '/uploader/getPosts',
        method: 'GET' as HTTPMethods,
        schema: getAllPostSchema,
        handler: getAllPostsHandler
    },
    {
        url: '/uploader/getPostsByFilter',
        method: 'GET' as HTTPMethods,
        schema: getPostsByFilterSchema,
        handler: getPostsByFilterHandler
    },
    {
        url: '/uploader/updatePost',
        method: 'PUT' as HTTPMethods,
        schema: updatePostSchema,
        preHandler: [authMiddleware, verifyUser],
        handler: updatePostHandler
    },
    {
        url: '/uploader/deletePost',
        method: 'DELETE' as HTTPMethods,
        schema: deletePostSchema,
        preHandler: [authMiddleware, verifyUser],
        handler: deletePostHandler
    }
]

const thoughtUploaderRoutes = async (fastify: FastifyInstance) => {
    thoughtRouteConfig.map(route => {
        fastify.route(route)
    })
}
export default thoughtUploaderRoutes