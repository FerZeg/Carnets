import { Router } from "express"
import { deleteUser } from "../../Controllers/apiV1/UserController.js"
import {verifyAuthTokenMiddleware} from "../../Controllers/apiV1/AuthTokensController.js"

const router = Router()
router.delete("/", verifyAuthTokenMiddleware, deleteUser)
export default router