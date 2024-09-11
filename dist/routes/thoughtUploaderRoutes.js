"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thoughtUploaderRouteHandler_1 = require("./thoughtUploaderRouteHandler");
const authPreHandler_1 = require("./authPreHandler");
const thoughtRouteConfig = [
    {
        url: '/uploader/createPost',
        method: 'POST',
        preHandler: authPreHandler_1.authPreHandler,
        handler: thoughtUploaderRouteHandler_1.createPosthandler
    },
    //no preHandler required as a normal user can access it without sign in.It is open for non auth user also
    {
        url: '/uploader/getPosts',
        method: 'GET',
        handler: thoughtUploaderRouteHandler_1.getAllPosts
    }
];
const thoughtUploaderRoutes = async (fastify) => {
    thoughtRouteConfig.map(route => {
        fastify.route(route);
    });
};
exports.default = thoughtUploaderRoutes;
