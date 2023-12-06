// This will be only temporal until we do some work on webhooks
import { updatePoints } from "./controllers/points.js"
import cron from "node-cron"

export function init() {
	cron.schedule("30 6 * * *", () => {
		console.log("Se están actualizando los puntos...")
		try {
			updatePoints()
		} catch (error) {
			console.log(error)
		}
	})
}

// 	cron.schedule("*/1 * * * *", () => {
// 		console.log("running a task every two minutes")
// 		updatePoints()
// 	})

// }
