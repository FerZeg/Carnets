import jsonwebtoken from "jsonwebtoken"

const TIME = 60 * 60 * 24 * 7 // 1 week in seconds
export const createAuthToken = (user) => {
	const payload =   {
		id: user._id,
		type: user.type,
		twitch_id: user.twitch_id,
	}
	const token = jsonwebtoken.sign({payload}, process.env.JWT_SECRET || "secret", {
		expiresIn: TIME
	})
	return token
}
export const verifyAuthToken = (token) => {
	return new Promise((resolve, reject) => {
		jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
			if(err) reject(err)
			resolve(decoded)
		})
	})
}
export const verifyAuthTokenMiddleware = async (req, res, next) => {
	const token = req.cookies.token
	if(!token) {
		return res.status(401).send("No se ha iniciado sesión")
	}
	try {
		const decoded = await verifyAuthToken(token)
		req.user = decoded.payload
		next()
	} catch (error) {
		res.clearCookie("token")
		return res.status(401).send("Error, inicie sesión nuevamente")
	}
}

export default {createAuthToken, verifyAuthToken, verifyAuthTokenMiddleware}
