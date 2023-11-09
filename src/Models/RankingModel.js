import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
import { BadRequestError } from "../Errors.js"

const carnetCollection = db.collection("carnet")

export const getStreamerRanking = async (streamer, offset = 0, limit = 25) =>{
	if(limit > 25 || limit < 1) throw new BadRequestError("No se pueden mostrar más de 25 carnets")
	if(offset < 0) throw new BadRequestError("No se pueden mostrar menos de 0 streamers")
	return carnetCollection.find({channel_id: new ObjectId(streamer._id), status: "active"}).sort({points: -1}).skip(offset * limit).limit(limit).toArray()
}

export default {getStreamerRanking}