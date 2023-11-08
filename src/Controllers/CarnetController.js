import CarnetModel from "../Models/CarnetModel.js"
import UserModel from "../Models/UserModel.js"
import { BadRequestError, NotFoundError } from "../Errors.js"
import TwitchApi from "../Services/twitchapi.js"
import User from "../Models/UserModel.js"

export async function createCarnet(req, res, next) {
	const id = req.user.id
	if(!req.params.channelname) return res.status(400).send("Falta el canal")
	try {
		const user = await User.getUserById(id)
		const streamer = await UserModel.getUserByTwitchName(req.params.channelname)
		if(id == streamer._id) {
			console.log("Carnet creado del mismo usuario")
			await CarnetModel.create(id, streamer._id, "twitch")
			return res.status(200).json("Creado correctamente")
		}
		if(!streamer) throw new NotFoundError("No existe ese canal", ["InvalidChannel"])
		const isFollowing = await TwitchApi.isUserFollowingChannel(user.access_token, user, streamer.twitch_id)
		if(!isFollowing) throw new BadRequestError("No sigues a este canal", ["NotFollowing"])
		await CarnetModel.create(req.user.id, streamer._id, "twitch")
		return res.status(200).json("Creado correctamente")
	} catch(err) {
		next(err)
	}
}

export async function getCarnets(req, res, next) {
	try {
		const id = req.user.id
		const carnet = await CarnetModel.getByUserId(id)
		const promises = carnet.map(async (carnet) => {
			const streamer = await UserModel.getUserById(carnet.channel_id)
			const user = await UserModel.getUserById(carnet.user_id)
			if(!streamer) return undefined
			carnet.streamer = {
				name: streamer.display_name,
				profile_url: streamer.profile_image_url
			}
			carnet.user = {
				name: user.display_name,
				profile_url: user.profile_image_url
			}
			return carnet
		})
		const result = await Promise.all(promises)
		return res.status(200).json(result)
	} catch(err) {
		next(err)
	}
}

export async function getCarnet(req, res, next) {
	try {
		const id = req.user.id
		const channelname = req.params.channelname
		const streamer = await UserModel.getUserByTwitchName(channelname)
		if(!streamer) throw new BadRequestError("No existe ese canal")
		const carnet = await CarnetModel.getByUserAndChannel(id, streamer._id)
		const user = await User.getUserById(id)
		if(!carnet) throw new NotFoundError("No se ha encontrado ningún carnet")
		return res.status(200).json({
			carnet, 
			streamer: {
				id: streamer._id, twitch_id: streamer.twitch_id, display_name: streamer.display_name, profile_image_url: streamer.profile_image_url
			},
			user: {
				id: user.display_name,
				profile_image_url: user.profile_image_url,
				twitch_id: user.twitch_id,
				display_name: user.display_name
			}
		})
	} catch(err) {
		next(err)
	}
}