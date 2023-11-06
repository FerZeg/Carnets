import { BadRequestError, NotFoundError } from "../Errors.js"
import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
const userCollection = db.collection("users")
export const createUser = async (user) => {
	const check = await userCollection.findOne({ twitch_id: user.twitch_id })
	if (check) {
		if(check.access_token !== user.access_token) {
			check.access_token = user.access_token
			check.refresh_token = user.refresh_token
			await updateUser(check._id, user)
			console.log("Tokens actualizados")
		}
		return { insertedCount: 0, data: check }
	}
	const lastId = await userCollection.find().sort({ id: -1 }).limit(1).toArray()
	if(lastId.length === 0) lastId.push({id: 0})
	const result = await userCollection.insertOne({ ...user, id: lastId[0].id + 1 })
	return { insertedCount: 1, data: { ...user, id: lastId[0].id + 1, _id: result.insertedId }}
}
export const deleteUser =  async (id) => {
	const result = await userCollection.deleteOne({ _id: new ObjectId(id) })
	if (result.deletedCount === 0) {
		throw new NotFoundError("No se encontró ningún usuario con ese ID")
	}
	return result
}
export const getUsers = async (max = 25, n = 1) => {
	if(max > 25) throw new BadRequestError("No se pueden mostrar más de 25 usuarios")
	return await userCollection.find({}).skip(n).limit(max).toArray()
}
export const getUserById = async (id) => {
	const user = await userCollection.findOne({ _id: new ObjectId(id) })
	if (!user) {
		throw new NotFoundError("No se encontró ningún usuario con ese ID")
	}
	// eslint-disable-next-line no-unused-vars
	//BUG
	//const { password, login, access_token, refresh_token, scope, ...safeUser } = user
	return user
}
export const getUserByTwitchId = async (twitch_id) => {
	return await userCollection.findOne({ twitch_id })
}
export const getUserByTwitchName = async (display_name) => {
	return await userCollection.findOne({ display_name})
}

export const updateUser =  async (id, user) => {
	const result = await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user })
	if (result.modifiedCount === 0) {
		return false
	}
	return true
}
export const changeUserType =  async (id, type) => {
	const result = await userCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { type } })
	if (!result) {
		throw new NotFoundError("No se encontró ningún usuario con ese ID")
	}
	return result
}

export default { createUser, deleteUser, getUsers, getUserById, getUserByTwitchId, updateUser, changeUserType, getUserByTwitchName }