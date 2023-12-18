import { BadRequestError, NotFoundError } from "../Errors.js"
import { db } from "../conexion.js"
import { ObjectId } from "mongodb"
const userCollection = db.collection("users")
const defaultValues = {
	display_name: 1, twitch_type: 1, profile_image_url: 1, twitch_description: 1, type: 1, _id: 0
}
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
	const result = await userCollection.insertOne(user)
	return { insertedCount: 1, data: { ...user, _id: result.insertedId }}
}
export const deleteUser =  async (id, options = {}) => {
	const result = await userCollection.deleteOne({ _id: new ObjectId(id) }, options.session)
	if (result.deletedCount === 0) {
		throw new NotFoundError("No se encontró ningún usuario con ese ID")
	}
	return result
}
export const getUsers = async (max = 25, n = 1, options = {sanetized: true}) => {
	if(max > 25) throw new BadRequestError("No se pueden mostrar más de 25 usuarios")
	return await userCollection.find({status:"active"}).project(options.sanetized ? defaultValues : {}).skip(n).limit(parseInt(max)).toArray()
}
export const getUserById = async (id, options = {sanetized: true}) => {
	const user = await userCollection.findOne({ _id: new ObjectId(id), status: "active" }, { projection: options.sanetized ? defaultValues : {} })
	// eslint-disable-next-line no-unused-vars
	//BUG
	//const { password, login, access_token, refresh_token, scope, ...safeUser } = user
	return user
}
export const getUserByTwitchId = async (twitch_id, options = {sanetized: true}) => {
	return await userCollection.findOne({ twitch_id }, { projection: options.sanetized ? defaultValues : {} })
}
export const getUserByTwitchName = async (display_name, options = {sanetized: true}) => {
	return await userCollection.findOne({ display_name}, { projection: options.sanetized ? defaultValues : {} })
}

export const updateUser =  async (id, user) => {
	const result = await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: user })
	return result.modifiedCount === 0
}
export const changeUserType =  async (id, type) => {
	const result = await userCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { type } })
	if (!result) {
		throw new NotFoundError("No se encontró ningún usuario con ese ID")
	}
	return result
}

export default { createUser, deleteUser, getUsers, getUserById, getUserByTwitchId, updateUser, changeUserType, getUserByTwitchName }