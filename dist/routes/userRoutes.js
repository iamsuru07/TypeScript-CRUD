"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutehandler_1 = require("./userRoutehandler");
const userRouteSchema_1 = require("../routeSchema/userRouteSchema");
const authPreHandler_1 = require("./authPreHandler");
const verifyUser_1 = require("../middlewares/verifyUser");
const routeConfig = [
    {
        url: '/user/signup',
        method: 'POST',
        schema: userRouteSchema_1.signUpSchema,
        handler: userRoutehandler_1.signUpHandler
    },
    {
        url: '/user/auth',
        method: 'POST',
        schema: userRouteSchema_1.loginSchema,
        handler: userRoutehandler_1.loginHandler
    },
    {
        url: '/user/updatePassword',
        method: 'PUT',
        schema: userRouteSchema_1.changePasswordSchema,
        preHandler: authPreHandler_1.authPreHandler,
        handler: userRoutehandler_1.updatePasswordHandler
    },
    {
        url: '/user/updateUsername',
        method: 'PUT',
        preHandler: [authPreHandler_1.authPreHandler, verifyUser_1.verifyUser],
        handler: userRoutehandler_1.updateUsernameHandler
    }
];
const userRoutes = async (fastify) => {
    routeConfig.map(route => {
        fastify.route(route);
    });
};
exports.default = userRoutes;
