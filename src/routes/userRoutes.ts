import { FastifyInstance, HTTPMethods } from "fastify"
import { changePasswordHandler, loginHandler, signUpHandler } from "./userRoutehandler"
import { changePasswordSchema, loginSchema, signUpSchema } from "../routeSchema/userRouteSchema"
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
    url: '/user/changePassword',
    method: 'PUT' as HTTPMethods,
    schema: changePasswordSchema,
    handler: changePasswordHandler
  },
]

const userRoutes = async (fastify: FastifyInstance) => {
  routeConfig.map(route => {
    fastify.route(route)
  })
}
export default userRoutes