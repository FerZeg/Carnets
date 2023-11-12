import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
const userCollection = db.collection("users")

export const updateReward = async (id, name, reward) => {
	const result = await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { [`rewards.${name}`]: reward } })
	if (result.modifiedCount === 0) {
		return false
	}
	return true
}