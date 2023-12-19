import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
import { BadRequestError } from "../Errors.js"

const carnetCollection = db.collection("carnet")

// Carnet {channel_id{}, user_id{}, id, date, observations, status, type, color, points, _id}
const Carnet = {
	deleteUserCarnets: async (user_id, options = {}) => {
		const result = await carnetCollection.deleteMany({ user_id: new ObjectId(user_id) }, options.session)
		return result
	},
	deleteStreamerCarnets: async (channel_id, options = {}) => {
		const result = await carnetCollection.deleteMany({ channel_id: new ObjectId(channel_id) }, options.session)
		return result
	},
	create: async (user_id, channel_id) => {
		try {
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
			})
			return result
		} catch(err) {
			throw err.code === 11000 
				? new BadRequestError("Ya tienes un carnet de este canal", ["AlreadyExist"])
				: err
		}
	},
	getByUserId: async (user_id) => {
		return await carnetCollection.aggregate([
			{ $match: { user_id: new ObjectId(user_id) } },
			{
				$lookup: {
					from: "users",
					localField: "user_id",
					foreignField: "_id",
					as: "streamer"
				}
			},
			{ $unwind: "$streamer" },
			{
				$project: {
					points: 1,
					type: 1,
					observations: 1,
					created_at: 1,
					color: 1,
					streamer: {
						display_name: 1,
						profile_image_url: 1,
					}
				}
			}
		]).project({_id: 0, "streamer._id": 0}).toArray()
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
