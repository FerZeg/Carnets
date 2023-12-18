import UserModel from "../../Models/UserModel.js"


export const deleteUser = async (req, res, next) => {
	try {
		const id = req.user.id
		await UserModel.deleteUser(id)
		res.status(200).json({result: "Usuario borrado"})
	} catch (error) {
		next(error)
	}
}