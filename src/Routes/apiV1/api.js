import {Router} from "express"
import streamerRouter from "./streamer.js"
import carnetRouter from "./carnet.js"
import rankingRouter from "./ranking.js"
import authRouter from "./auth.js"
import callbackRouter from "./callback.js"
import rewardRouter from "./customrewards.js"
import {BadRequestError, NotFoundError, UnauthorizedError} from "../../Errors.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/streamer", streamerRouter)
router.use("/carnet", carnetRouter)
router.use("/ranking", rankingRouter)
router.use("/callback", callbackRouter)
router.use("/rewards", rewardRouter)

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
	if(err instanceof UnauthorizedError) {
		return res.status(401).send({error_type: err.name, message: err.message})
	}
	if(err instanceof NotFoundError) {
		return res.status(404).send({error_type: err.name, message: err.message})
	}
	if(err instanceof BadRequestError) {
		return res.status(400).send({error_type: err.name, message: err.message, reasons: err.reasons})
	}
	console.log(err.message)
	return res.status(500).send({message: "Ha ocurrido un error en el servidor"})
})
export default router