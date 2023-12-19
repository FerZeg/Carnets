import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
import { BadRequestError } from "../Errors.js"

const carnetCollection = db.collection("carnet")

export const getStreamerRankingWithUser = async (streamer, options) =>{
	const offset = parseInt(options.offset, 10) || 0
	const limit = parseInt(options.limit, 10) || 25
	if(limit > 25 || limit < 1) throw new BadRequestError("No se pueden mostrar más de 25 carnets")
	if(offset < 0) throw new BadRequestError("No se pueden mostrar menos de 0 streamers")
	return await carnetCollection.aggregate([
		{$match: {channel_id: new ObjectId(streamer._id), status: "active"}},
		{$sort: {points: -1}},
		{$skip: offset * limit},
		{$limit: limit},
		{$lookup: {
			from: "users",
			localField: "user_id",
			foreignField: "_id",
			as: "user"
		}},
		{$unwind: "$user"},
		{$project: {
			points: 1,
			type: 1,
			observations: 1,
			created_at: 1,
			color: 1,
			user: {
				display_name: 1,
				profile_image_url: 1
			}
		}}
	]).project({_id: 0, user: {_id: 0}}).toArray()
}