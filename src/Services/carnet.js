import UserModel from "../Models/UserModel.js"


export const extractUserCarnetsData = async (carnets) => {
	const promises = carnets.map(async (carnet) => {
		const streamer = await UserModel.getUserById(carnet.channel_id)
		if(!streamer) return undefined
		carnet.streamer = {
			name: streamer.display_name,
			profile_url: streamer.profile_image_url
		}
		carnet._id = undefined
		carnet.user_id = undefined
		carnet.channel_id = undefined

		
		return carnet 
	})

	return Promise.all(promises)
}