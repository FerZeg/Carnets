import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/authtokens.js"
import User from "../../Models/UserModel.js"
import Streamer from "../../Models/StreamerModel.js"
const router = Router()
router.get("/", async (req, res, next) => {
	const {max, offset} = req.query
	try {
		const streamers = await Streamer.getStreamers(max, offset)
		return res.status(200).json(streamers)
	} catch (error) {
		next(error)
	}
})
router.post("/upgrade", verifyAuthTokenMiddleware, async (req, res, next) => {
	try {
		const id = req.user.id
		await User.changeUserType(id, "streamer")
		return res.status(200).send("Streamer actualizado")
	} catch (error) {
		next(error)
	}	
})
router.post("/downgrade", verifyAuthTokenMiddleware, async (req, res, next) => {
	try {
		const id = req.user.id
		await User.changeUserType(id, "user")
		return res.status(200).send("Streamer actualizado")
	} catch (error) {
		next(error)
	}	
})
export default router