import { deleteUser } from "../Models/UserModel.js"
import Carnet from "../Models/CarnetModel.js"
import { client } from "../conexion.js"

export const deleteUserAndCards = async (userId) => {
	const session = client.startSession()
	session.startTransaction()
	try {
		await deleteUser(userId, { session })
		await Carnet.deleteUserCarnets(userId, { session })
		await session.commitTransaction()
	} catch (error) {
		await session.abortTransaction()
		throw error
	} finally {
		session.endSession()
	}
}