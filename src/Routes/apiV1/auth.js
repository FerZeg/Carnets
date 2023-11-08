import { Router } from "express"
import { getUserDataWithToken, verifyAuthTokenMiddleware } from "../../Controllers/AuthTokensController.js"

const router = Router()

router.get("/data", verifyAuthTokenMiddleware, getUserDataWithToken)

export default router