import UserModel from "../Models/UserModel.js"


export const extractCarnetData = async (carnets) => {
	const promises = carnets.map(async (carnet) => {
		const streamer = await UserModel.getUserById(carnet.channel_id)
		const user = await UserModel.getUserById(carnet.user_id)
		if(!streamer) return undefined
		carnet.streamer = {
			name: streamer.display_name,
			profile_url: streamer.profile_image_url
		}
		carnet.user = {
			name: user.display_name,
			profile_url: user.profile_image_url
		}
		return carnet 
	})

	return Promise.all(promises)
}