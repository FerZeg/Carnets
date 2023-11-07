import { BadRequestError } from "../Errors.js"
import {db} from "../conexion.js"
const streamerCollection = db.collection("users")

const Streamer = {
	createStreamer: async (streamer) => {
		const result = await streamerCollection.insertOne(streamer)
		if(result.insertedCount === 0) throw new BadRequestError("No se pudo crear el streamer")
		return result
	},
	getStreamerByName: async (name) => {
		return await streamerCollection.findOne({display_name: name})
	},
	getStreamers: async (max = 25, n = 0) => {
		if(max > 25) throw new BadRequestError("No se pueden mostrar más de 25 streamers")
		return await streamerCollection.find({type: "streamer"}).project({id: 1, display_name: 1, twitch_type: 1, profile_image_url: 1  }).skip(n * max).limit(max).toArray()
	}
}

export default Streamer