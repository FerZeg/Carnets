// This will be only temporal until we do some work on webhooks
import { updatePoints } from "./Services/points.js"
import cron from "node-cron"

export function init() {
	const task = cron.schedule("30 6 * * *", () => {
		console.log("Se están actualizando los puntos...")
		try {
			updatePoints()
		} catch (error) {
			console.log(error)
		}
	})
	return task
}


// 	cron.schedule("*/1 * * * *", () => {
// 		console.log("running a task every two minutes")
// 		updatePoints()
// 	})

// }
