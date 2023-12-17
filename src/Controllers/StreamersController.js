import User from "../Models/UserModel.js"
import fs from "fs"
import Streamer from "../Models/StreamerModel.js"
import { UnauthorizedError } from "../Errors.js"
const streamerValidation = JSON.parse(fs.readFileSync("streamers.json", "utf8"))

export const upgradeUserToStreamer = async (req, res, next) => { 
	try {
		const user = await User.getUserById(req.user.id)
		if(!streamerValidation.names.includes(user.display_name)) 
			throw new UnauthorizedError("No tienes permiso", ["NoListedStreamer"])
		const id = req.user.id
		await User.changeUserType(id, "streamer")
		res.status(200).json({result: "Streamer actualizado"})
	} catch (error) {
		next(error)
	}
}
export const donwngradeToUser = async (req, res, next) => {
	try {
		const id = req.user.id
		await User.changeUserType(id, "user")
		res.status(200).json({result: "Streamer actualizado"})
	} catch (error) {
		next(error)
	}
}
/**
 * Get streamers with pagination.
 * @param {Object} req.query.max - The maximum number of streamers to retrieve.
 * @param {Object} req.query.offset - The offset from which to retrieve the streamers.
 * @returns {Object} - Returns a JSON object containing the streamers.
 */
export const getStreamers = async (req, res, next) => {
	const {max, offset} = req.query
	try {
		const streamers = await Streamer.getStreamers(max, offset)
		return res.status(200).json(streamers)
	} catch (error) {
		next(error)
	}
}

export const getStreamer = async (req, res, next) => {
	const {channelname} = req.params
	try {
		const streamer = await Streamer.getStreamerByName(channelname)
		if(!streamer) return res.status(404).send("Streamer no encontrado")
		return res.status(200).json(streamer)
	} catch (error) {
		next(error)
	}
}