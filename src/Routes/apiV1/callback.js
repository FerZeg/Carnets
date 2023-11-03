import { Router} from "express"
import TwitchApi from "../../Controllers/twitchapi.js"
import User from "../../Models/UserModel.js"
import  AuthToken from "../../Controllers/authtokens.js"
const router = Router()

router.get("/twitch", async (req, res, next) => {
	const token = req.cookies.token
	if(token) {
		const verify = await AuthToken.verifyAuthToken(token)
		if(verify) {
			return res.redirect("/")
		}
	}
	try{
		const response = await TwitchApi.getOauthToken(req.query.code)
		const userData = await TwitchApi.getUserDataBearer(response.access_token)
		const data = userData.data[0]
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
			type: ""
		})
		console.log(user.data)
		return res.cookie("token", AuthToken.createAuthToken(user.data), {httpOnly: true}).redirect("/")
	} catch (error) {
		next(error)
	}
})

export default router