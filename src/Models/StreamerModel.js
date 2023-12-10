import { BadRequestError } from "../Errors.js"
import {db} from "../conexion.js"
const streamerCollection = db.collection("users")

const defaultValues = {
	display_name: 1, twitch_type: 1, profile_image_url: 1, twitch_description: 1
}

const Streamer = {
	createStreamer: async (streamer) => {
		const result = await streamerCollection.insertOne(streamer)
		if(result.insertedCount === 0) throw new BadRequestError("No se pudo crear el streamer")
		return result
	},
	getStreamerByName: async (name) => {
		return await streamerCollection.findOne({display_name: name, status: "active"}, {projection: defaultValues})
	},
	getStreamers: async (max = 25, n = 0) => {
		if(max > 25) throw new BadRequestError("No se pueden mostrar más de 25 streamers")
		if(n < 0) throw new BadRequestError("No se pueden mostrar menos de 0 streamers")
		max = parseInt(max)
		return await streamerCollection.find({type: "streamer"}).project(defaultValues).skip(n * max).limit(max).toArray()
	},
	getStreamersWithRewards: async () => {
		return await streamerCollection.find({type: "streamer", status: "active", rewards: {$exists: true}}).project({login: 1, twitch_id: 1, display_name: 1, rewards: 1}).toArray()
	}

}

export default Streamer