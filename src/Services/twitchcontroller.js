import { BadRequestError } from "../Errors.js"
import UserModel from "../Models/UserModel.js"
const TwitchApiURL = "https://api.twitch.tv/helix"
import { updateReward } from "../Models/RewardModel.js"
import CarnetModel from "../Models/CarnetModel.js"

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
	const data = await response.json()
	return data
}
export const isUserFollowingChannel = async (access_token, user, broadcaster_id) => {
	const URL = TwitchApiURL + `/channels/followed?user_id=${user.twitch_id}&broadcaster_id=${broadcaster_id}`
	const response = await fetch(URL, {
		headers: {
			"Authorization": "Bearer " + access_token,
			"Client-Id": process.env.CLIENT_ID
		}
	})
	if(!response.ok) {
		if(response.status === 401) {
			const resp = await tryRefreshTokens(access_token, user._id)
			if(!resp) throw new Error("Error al actualizar tokens")
			return isUserFollowingChannel(resp.access_token, user._id, broadcaster_id)
		}
	}
	const data = await response.json()
	return data.data.length > 0 ? true : false //Unknown Error some times on .length, sometimes twitch_id is null
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
	const finalId = user_id
	if(!resp.ok) {
		const user = await UserModel.getUserById(finalId, {sanetized: false})
		console.log(user)
		const resp = await refreshToken(user.refresh_token)
		if(!resp.ok) return false
		UserModel.updateUser(user_id, {access_token: resp.access_token, refresh_token: resp.refresh_token})
		return resp
	}
}

export const createSpecialReward = async (streamer, reward, type) => {
	const user = await UserModel.getUserById(streamer.id)
	const options = (() => {
		switch(type) {
		case "special": 
			return {max_per_stream: reward.max, is_max_per_stream_enabled: true}
		case "perStream":
			return {max_per_user_per_stream: reward.max, is_max_per_user_per_stream_enabled: true}
		}
	})()
	console.log(options)
	const URL = TwitchApiURL + "/channel_points/custom_rewards" + "?broadcaster_id=" + user.twitch_id
	const response = await fetch(URL, {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + user.access_token,
			"client-id": process.env.CLIENT_ID,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			title: reward.title,
			cost: reward.cost,
			prompt: reward.prompt,
			is_enabled: true,
			...options,
		})
	})

	if(!response.ok) throw new BadRequestError("Error al crear la recompensa")

	const data = await response.json()
	console.log(data)
	await updateReward(streamer.id, type, {id: data.data[0].id})
}
export const processRedemptions = async (streamer, reward) => {
	console.log("Actualizando streamer " + streamer.display_name)
	const allRedemptions = await getRedemptions(streamer, reward) // Get all redemptions for the reward
	// Fulfill the redemptions in batches
	for (let i = 0; i < allRedemptions.length; i += 50) {
		const batch = allRedemptions.slice(i, i + 50)
		try {
			await fulfillRedemption(streamer, batch, reward) // Fulfill the redemptions
			await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second
		} catch (error) {
			console.error(`Error fulfilling redemptions: ${error.message}`)
		}
	}
}

const getRedemptions = async (streamer, reward) => {
	let cursor
	let allRedemptions = []
	do {
		const params = new URLSearchParams({
			broadcaster_id: streamer.twitch_id,
			reward_id: reward.id,
			status: "UNFULFILLED",
			first: 50, // Get the maximum number of redemptions per page
		})
		if (cursor) {
			params.append("after", cursor) // Get the next page of results
		}
		const URL = `${TwitchApiURL}/channel_points/custom_rewards/redemptions?${params}`
		const response = await fetch(URL, {
			headers: {
				"Authorization": `Bearer ${streamer.access_token}`,
				"client-id": process.env.CLIENT_ID,
			}
		})

		const data = await response.json()

		if (!response.ok) throw new BadRequestError("Error al obtener las redenciones")

		allRedemptions = allRedemptions.concat(data.data)
		cursor = data.pagination.cursor // Get the cursor for the next page of results
	} while (cursor)
	return allRedemptions
}

export const fulfillRedemption = async (streamer, redemptions, reward) => {
	const params = new URLSearchParams({
		broadcaster_id: streamer.twitch_id,
		reward_id: reward.id,
	})
	for (const redemption of redemptions) {
		params.append("id", redemption.id)
	}
	const URL = `${TwitchApiURL}/channel_points/custom_rewards/redemptions?` + params
	const response = await fetch(URL, {
		method: "PATCH",
		headers: {
			"Authorization": `Bearer ${streamer.access_token}`,
			"client-id": process.env.CLIENT_ID,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			status: "FULFILLED",
		}),
	})
	const data = await response.json()
	data.data.forEach(async redemption => {
		console.log(`Redemption fulfilled: ${redemption.user_name}`)
		const user = await UserModel.getUserByTwitchId(redemption.user_id)
		if(!user) return
		const carnet = await CarnetModel.getByUserAndChannel(user._id, streamer._id)
		if(!carnet) return
		if(!carnet.points) carnet.points = 0
		carnet.points += Math.floor(redemption.reward.cost / 100)
		CarnetModel.update(carnet._id, carnet)
	})

	console.log("Redenciones cumplidas")
}

export default {getUserDataBearer, getOauthToken, isUserFollowingChannel, validateToken, tryRefreshTokens}
