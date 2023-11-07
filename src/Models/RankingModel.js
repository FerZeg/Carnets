import { db } from "../conexion.js"
import { ObjectId } from "mongodb"

const carnetCollection = db.collection("carnet")

export const getStreamerRanking = async (streamer, offset = 0, limit = 25) =>{
    if(limit > 25 || limit < 1) throw new BadRequestError("No se pueden mostrar más de 25 carnets")
    if(offset < 0) throw new BadRequestError("No se pueden mostrar menos de 0 streamers")
    return carnetCollection.find({channel_id: new ObjectId(streamer._id), status: "active"}).project({_id: 1, created_at: 1, updated_at: 1, points: 1, type: 1}).sort({points: -1}).skip(offset * limit).limit(limit).toArray()
}

export default {getStreamerRanking}