import { BadRequestError } from "../Errors.js"
import { createSpecialReward } from "../Services/twitchapi.js"

const defaultValues = {
	special: {
		prompt: "Has canjeado los puntos correctamente!",
		title: "Puntos Carnet Limitados",
		cost: 200,
		max: 20
	},
	perStream: {
		prompt: "Has canjeado los puntos correctamente!",
		title: "Puntos Carnet por Stream",
		cost: 500,
		max: 1
	},
	unlimited: {
		prompt: "Has canjeado los puntos correctamente!",
		title: "Puntos Carnet Ilimitados",
		cost: 1000,
	}
}
export const specialRewardMiddleware = async (req, res, next) => {
	const type = req.body.type
	try {
		if (!type) throw new BadRequestError("No se ha especificado el tipo de recompensa")
		if (!defaultValues[type]) throw new BadRequestError("Tipo de recompensa no válido")

		const { prompt, title, cost, max } = { ...defaultValues[type], ...req.body }
		await createSpecialReward(req.user, { prompt, title, cost, max }, type)
		return res.status(200).json("created")
	} catch (error) {
		next(error)
	}
}