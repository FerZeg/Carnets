import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/AuthTokensController.js"
import { donwngradeToUser, getStreamers, upgradeUserToStreamer, getStreamer } from "../../Controllers/StreamersController.js"

const router = Router()

router.get("/:channelname", getStreamer)
router.get("/", getStreamers)
router.post("/upgrade", upgradeUserToStreamer)
router.post("/downgrade", verifyAuthTokenMiddleware, donwngradeToUser)

export default router