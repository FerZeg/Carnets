import UserModel from "../Models/UserModel.js"
const TwitchApiURL = "https://api.twitch.tv/helix"

export const getUserDataBearer =  async (bearer) => {
	const response = await fetch(TwitchApiURL + "/users", {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + bearer,
			"Client-Id": process.env.CLIENT_ID

		}
	})
	if (!response.ok) throw new Error(response.statusText)
	const data = await response.json()
	return data
        
}
export const getOauthToken = async (code) => {
	const response = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		body: new URLSearchParams({
			"client_id": process.env.CLIENT_ID,
			"client_secret": process.env.TWITCH_SECRET,
			"code": code,
			"grant_type": "authorization_code",
			"redirect_uri": process.env.REDIRECT_URL})
	})
	if(!response.ok) throw new Error(response.statusText)
	const data = await response.json()
	return data
}
export const refreshToken = async (refresh_token) => {
	const response = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		body: new URLSearchParams({
			"client_id": process.env.CLIENT_ID,
			"client_secret": process.env.TWITCH_SECRET,
			"refresh_token": refresh_token,
			"grant_type": "refresh_token"})
	})
	if(!response.ok) throw new Error(response.statusText)
	const data = await response.json()
	return data
}
export const isUserFollowingChannel = async (access_token, user_id, broadcaster_id) => {
	const URL = TwitchApiURL + `/channels/followed?user_id=${user_id}&broadcaster_id=${broadcaster_id}`
	const response = await fetch(URL, {
		headers: {
			"Authorization": "Bearer " + access_token,
			"Client-Id": process.env.CLIENT_ID
		}
	})
	console.log(response.status)
	if(!response.ok) {
		if(response.status === 401) {
			const resp = await tryRefreshTokens(access_token, user_id)
			if(!resp) throw new Error("Error al actualizar tokens")
			return isUserFollowingChannel(resp.access_token, user_id, broadcaster_id)
		}
	}
	const data = await response.json()
	return data.data.length > 0 ? true : false
}
export const validateToken = async (access_token) => {
	const URL = "https://id.twitch.tv/oauth2/validate"
	const response = await fetch(URL, {
		headers: {
			"Authorization": "OAuth " + access_token,
			"Client-Id": process.env.CLIENT_ID
		}
	})
	const data = await response.json()
	// returns 401 if failed.
	return data
}
export const tryRefreshTokens = async (access_token, user_id) => {
	const resp = await validateToken(access_token)
	if(!resp.ok) {
		const user = await UserModel.getUserById(user_id)
		const resp = await refreshToken(user.refresh_token)
		UserModel.updateUser(user_id, {access_token: resp.access_token, refresh_token: resp.refresh_token})
		return resp
	}
}


export default {getUserDataBearer, getOauthToken, isUserFollowingChannel, validateToken, tryRefreshTokens}
