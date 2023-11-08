import { Router } from "express"
import {verifyAuthTokenMiddleware} from "../../Controllers/AuthTokensController.js"
import { createCarnet, getCarnets, getCarnet } from "../../Controllers/CarnetController.js"

const router = Router()

router.post("/:channelname", verifyAuthTokenMiddleware, createCarnet)
router.get("/:channelname", verifyAuthTokenMiddleware, getCarnet)
router.get("/", verifyAuthTokenMiddleware, getCarnets)

export default router