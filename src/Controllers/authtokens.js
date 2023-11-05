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

export const extractBearerToken = (req) => {
	const bearerToken = req.headers.authorization
	if(!bearerToken) return null
	const token = bearerToken.split(" ")[1]
	return token
}

export default {createAuthToken, verifyAuthToken, verifyAuthTokenMiddleware}
