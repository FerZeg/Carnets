import { Router } from "express"
import { verifyAuthTokenMiddleware } from "../../Controllers/authtokens.js"
import UserModel from "../../Models/UserModel.js"
const router = Router()
router.get("/data", verifyAuthTokenMiddleware, async (req, res, next) => {
	try {
		const data = await UserModel.getUserById(req.user.id)
		return res.status(200).json(data)
	} catch (error) {
		next(error)
	}
})
export default router