import { Router} from "express"
import { twitchCallback } from "../../Controllers/apiV1/CallbackController.js"

const router = Router()

router.get("/twitch", twitchCallback)

export default router