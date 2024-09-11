import { FastifyInstance, HTTPMethods } from "fastify"
import { createPosthandler, getAllPosts } from "./thoughtUploaderRouteHandler"
import { authPreHandler } from "./authPreHandler"
const thoughtRouteConfig = [
    {
        url: '/uploader/createPost',
        method: 'POST' as HTTPMethods,
        preHandler: authPreHandler,
        handler: createPosthandler
    },
    //no preHandler required as a normal user can access it without sign in.It is open for non auth user also
    {
        url: '/uploader/getPosts',
        method: 'GET' as HTTPMethods,
        handler: getAllPosts
    }
]

const thoughtUploaderRoutes = async (fastify: FastifyInstance) => {
    thoughtRouteConfig.map(route => {
        fastify.route(route)
    })
}
export default thoughtUploaderRoutes