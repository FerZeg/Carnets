import UserModel from "../Models/UserModel.js"


export const extractUserCarnetsData = async (carnets) => {
	const promises = carnets.map(async (carnet) => {
		const streamer = await UserModel.getUserById(carnet.channel_id)
		if(!streamer) return undefined
		carnet.streamer = {
			name: streamer.display_name,
			profile_url: streamer.profile_image_url
		}
		return carnet 
	})

	return Promise.all(promises)
}
export const extractCarnetsFromStreamer = async (carnets) => {
	const promises = carnets.map(async (carnet) => {
		const user = await UserModel.getUserById(carnet.user_id)
		if(!user) return undefined
		carnet.user = {
			name: user.display_name,
			profile_url: user.profile_image_url
		}
		return carnet 
	})
	return Promise.all(promises)
	
}