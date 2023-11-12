import {Router} from "express"
import { verifyAuthTokenMiddleware, verifyUserType } from "../../Controllers/AuthTokensController.js"
import { specialRewardMiddleware } from "../../Controllers/RewardController.js"

const router = Router()

router.post("/addReward", verifyAuthTokenMiddleware, verifyUserType("streamer"), specialRewardMiddleware)

export default router