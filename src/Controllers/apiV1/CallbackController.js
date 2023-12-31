import TwitchApi from "../../Services/twitchcontroller.js"
import User from "../../Models/UserModel.js"
import { createAuthToken } from "../../Services/authtoken.js"


export const twitchCallback = async (req, res) => {
	try{
		const response = await TwitchApi.getOauthToken(req.query.code)
		const userData = await TwitchApi.getUserDataBearer(response.access_token)
		const data = userData.data[0]
		const userExist = await User.getUserByTwitchId(data.id, {sanetized: false})
		if(userExist) {
			const tokenCreated = createAuthToken(userExist)
			return res.redirect(`${process.env.REDIRECT_URL}/success?token=${tokenCreated}`)
		}
		const user = await User.createUser({
			login: data.login, 
			display_name: data.display_name,
			profile_image_url: data.profile_image_url, 
			twitch_id: data.id, 
			access_token: response.access_token, 
			refresh_token: response.refresh_token,
			twitch_created_at: data.created_at,
			broadcaster_type: data.broadcaster_type,
			twitch_description: data.description,
			twitch_type: data.type,
			created_at: new Date(),
			updated_at: new Date(),
			scope: response.scope,
			type: "",
			status: "active",
		})
		const tokenCreated = createAuthToken(user.data)
		return res.redirect(`${process.env.REDIRECT_URL}/success?token=${tokenCreated}`)
	} catch (error) {
		console.log(error)
		return res.redirect(`${process.env.REDIRECT_URL}/error`)
	}
}