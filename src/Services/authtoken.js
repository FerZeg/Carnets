import jsonwebtoken from "jsonwebtoken"
export const extractBearerToken = (req) => {
	const bearerToken = req.headers.authorization
	if(!bearerToken) return null
	const token = bearerToken.split(" ")[1]
	return token
}
const TIME = 60 * 60 * 24 * 7 // 1 week in seconds
export const createAuthToken = (user) => {
	// TO DO - Create a JWT token with the user id as payload not _id
	const payload =   {
		id: user._id,
		type: user.type
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