import { db } from "../conexion.js"
import { ObjectId } from "mongodb"

const carnetCollection = db.collection("carnet")

// Carnet {channel_id{}, user_id{}, id, date, observations, status, type, color, points, _id}
const Carnet = {
	create: async (user_id, channel_id, platform) => {
		const result = await carnetCollection.insertOne({
			user_id: new ObjectId(user_id),
			channel_id: new ObjectId(channel_id),
			observations: "",
			status: "active",
			type: "normal",
			color: "default",
			points: 0,
			created_at: new Date(),
			updated_at: new Date(),
			platform
		})
		return result
	},
	getByUserId: async (user_id) => {
		const result = await carnetCollection.find({ user_id: new ObjectId(user_id) }).toArray()
		return result
	},
	getById: async (_id) => {
		const result = await carnetCollection.findOne({ _id })
		return result
	},
	getByUserAndChannel: async (user_id, channel_id) => {
		const result = await carnetCollection.findOne({ user_id: new ObjectId(user_id), channel_id: new ObjectId(channel_id) })
		return result
	},
	update: async (_id, carnet) => {
		const result = await carnetCollection.updateOne({ _id }, { $set: carnet })
		return result
	},
	delete: async (_id) => {
		const result = await carnetCollection.deleteOne({ _id })
		return result
	}

}

export default Carnet
