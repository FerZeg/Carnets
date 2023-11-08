import User from "../Models/UserModel.js"
import fs from "fs"
import Streamer from "../Models/StreamerModel.js"
const streamerValidation = JSON.parse(fs.readFileSync("streamers.json", "utf8"))

export const upgradeUserToStramer = async (req, res, next) => { 
	try {
		const user = await User.getUserById(req.user.id)
		if(!streamerValidation.names.includes(user.display_name)) throw new Error("No puedes ser streamer")
		const id = req.user.id
		await User.changeUserType(id, "streamer")
		return res.status(200).send("Streamer actualizado")
	} catch (error) {
		next(error)
	}
}
export const donwngradeToUser = async (req, res, next) => {
	try {
		const id = req.user.id
		await User.changeUserType(id, "user")
		return res.status(200).send("Streamer actualizado")
	} catch (error) {
		next(error)
	}
}
export const getStreamers = async (req, res, next) => {
	const {max, offset} = req.query
	try {
		const streamers = await Streamer.getStreamers(max, offset)
		return res.status(200).json(streamers)
	} catch (error) {
		next(error)
	}
}