import { FastifyInstance, HTTPMethods, RouteOptions } from "fastify"
import { deleteUserHandler, loginHandler, signUpHandler, updatePasswordHandler, updateUsernameHandler } from "./userRoutehandler"
import { deleteUserSchema, loginSchema, signUpSchema, updatePasswordSchema, updateUsernameSchema } from "../routeSchema/userRouteSchema"
import { verifyUser } from "../middlewares/verifyUser"
import { authMiddleware } from "../middlewares/authMiddleware"
const routeConfig = [
  {
    url: '/user/signup',
    method: 'POST' as HTTPMethods,
    schema: signUpSchema,
    handler: signUpHandler
  },
  {
    url: '/user/auth',
    method: 'POST' as HTTPMethods,
    schema: loginSchema,
    handler: loginHandler
  },
  {
    url: '/user/updatePassword',
    method: 'PUT' as HTTPMethods,
    schema: updatePasswordSchema,
    preHandler: [authMiddleware, verifyUser],
    handler: updatePasswordHandler
  },
  {
    url: '/user/updateUsername',
    method: 'PUT' as HTTPMethods,
    schema: updateUsernameSchema,
    preHandler: [authMiddleware, verifyUser],
    handler: updateUsernameHandler
  },
  {
    url: '/user/deleteUser/:id/:username',
    method: 'DELETE' as HTTPMethods,
    schema: deleteUserSchema,
    preHandler: [authMiddleware, verifyUser],
    handler: deleteUserHandler
  }
]

const userRoutes = async (fastify: FastifyInstance) => {
  routeConfig.map(route => {
    fastify.route(route)
  })
}
export default userRoutes