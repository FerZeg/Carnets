import {Router} from "express"
import { verifyAuthTokenMiddleware, verifyUserType } from "../../Controllers/apiV1/AuthTokensController.js"
import { specialRewardMiddleware } from "../../Controllers/apiV1/RewardController.js"

const router = Router()

router.post("/addReward", verifyAuthTokenMiddleware, verifyUserType("streamer"), specialRewardMiddleware)

export default router