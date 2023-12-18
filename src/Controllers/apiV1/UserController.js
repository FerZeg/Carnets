import { deleteUserAndCards } from "../../Services/UserService.js"


export const deleteUser = async (req, res, next) => {
	try {
		const id = req.user.id
		await deleteUserAndCards(id)
		res.status(200).json({result: "Usuario borrado"})
	} catch (error) {
		next(error)
	}
}