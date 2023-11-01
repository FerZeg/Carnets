import { BadRequestError } from "../Errors.js"
import {db} from "../conexion.js"
const streamerCollection = db.collection("users")

const Streamer = {
	createStreamer: async (streamer) => {
		const result = await streamerCollection.insertOne(streamer)
		if(result.insertedCount === 0) throw new BadRequestError("No se pudo crear el streamer")
		return result
	},
	getStreamers: async (max = 25, n = 0) => {
		if(max > 25) throw new BadRequestError("No se pueden mostrar más de 25 streamers")
		return await streamerCollection.find({type: "streamer"}).skip(n * max).limit(max).toArray()
	}
}

export default Streamer