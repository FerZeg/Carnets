import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/apiV1/AuthTokensController.js"
import { donwngradeToUser, getStreamers, upgradeUserToStreamer, getStreamer } from "../../Controllers/apiV1/StreamersController.js"

const router = Router()

router.get("/:channelname", getStreamer)
router.get("/", getStreamers)
router.post("/upgrade", verifyAuthTokenMiddleware, upgradeUserToStreamer)
router.post("/downgrade", verifyAuthTokenMiddleware, donwngradeToUser)

export default router