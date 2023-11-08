import { Router } from "express"
import { getRanking } from "../../Controllers/RankingController.js"
const router = Router()

router.get("/:channelname", getRanking)

export default router