import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/authtokens.js"
import User from "../../Models/UserModel.js"
import Streamer from "../../Models/StreamerModel.js"
import fs from "fs"
const streamerValidation = JSON.parse(fs.readFileSync("streamers.json", "utf8"))
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
		const user = await User.getUserById(req.user.id)
		if(!streamerValidation.names.includes(user.display_name)) throw new Error("No puedes ser streamer")
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