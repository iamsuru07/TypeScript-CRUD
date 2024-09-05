"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutehandler_1 = require("./userRoutehandler");
const userRouteSchema_1 = require("../routeSchema/userRouteSchema");
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
        url: '/user/changePassword',
        method: 'PUT',
        schema: userRouteSchema_1.changePasswordSchema,
        handler: userRoutehandler_1.changePasswordHandler
    },
];
const userRoutes = async (fastify) => {
    routeConfig.map(route => {
        fastify.route(route);
    });
};
exports.default = userRoutes;
