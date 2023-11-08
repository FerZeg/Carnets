import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/AuthTokensController.js"
import { donwngradeToUser, getStreamers, upgradeUserToStramer } from "../../Controllers/StreamersController.js"

const router = Router()

router.get("/", getStreamers)
router.post("/upgrade", upgradeUserToStramer)
router.post("/downgrade", verifyAuthTokenMiddleware, donwngradeToUser)

export default router