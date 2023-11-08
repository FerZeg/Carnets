import { extractBearerToken, verifyAuthToken } from "../Services/authtoken.js"

import UserModel from "../Models/UserModel.js"

export const verifyAuthTokenMiddleware = async (req, res, next) => {
	const token = extractBearerToken(req)
	if(!token) {
		return res.status(401).send("Error, inicie sesión nuevamente")
	}
	try {
		const decoded = await verifyAuthToken(token)
		req.user = decoded.payload
		return next()
	} catch (error) {
		return res.status(401).redirect("/logout")
	}
}

export const getUserDataWithToken = async (req, res, next) => {
	try {
		const data = await UserModel.getUserById(req.user.id)
		return res.status(200).json(data)
	} catch (error) {
		next(error)
	}
}
