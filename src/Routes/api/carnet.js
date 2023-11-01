import { Router } from "express"
import {verifyAuthTokenMiddleware} from "../../Controllers/authtokens.js"
import CarnetModel from "../../Models/CarnetModel.js"
import TwitchApi from "../../Controllers/twitchapi.js"
import User from "../../Models/UserModel.js"
import UserModel from "../../Models/UserModel.js"
import { BadRequestError, NotFoundError } from "../../Errors.js"

const router = Router()
router.post("/", verifyAuthTokenMiddleware, async (req, res, next) => {
	const id = req.user.id
	const {channel_id, broadcaster_app_id} = req.body
	console.log(broadcaster_app_id)
	if(!channel_id || !broadcaster_app_id) return res.status(400).send("Falta el canal")
	try {
		const user = await User.getUserById(id)
		const isFollowing = await TwitchApi.isUserFollowingChannel(user.access_token, user.twitch_id, channel_id)
		if(!isFollowing) throw new BadRequestError("No sigues a este canal", ["NotFollowing"])
		const carnet = await CarnetModel.getByUserAndChannel(id, broadcaster_app_id)
		if(carnet) throw new BadRequestError("Ya tienes un carnet de este canal", ["AlreadyExist"])
		await CarnetModel.create(req.user.id, broadcaster_app_id, "twitch")
		return res.status(200).json("Creado correctamente")
	} catch(err) {
		console.log(err)
		next(err)
	}
})
router.get("/", verifyAuthTokenMiddleware, async (req, res, next) => {
	try {
		const id = req.user.id
		const carnet = await CarnetModel.getByUserId(id)
		if(!carnet) throw new NotFoundError("No se ha encontrado ningún carnet")
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
})
router.get("/:channelname", verifyAuthTokenMiddleware, async (req, res, next) => {
	try {
		const id = req.user.id
		const channelname = req.params.channelname
		const streamer = await UserModel.getUserByTwitchName(channelname)
		if(!streamer) throw new NotFoundError("No se ha encontrado el canal")
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
})



export default router