import request from "supertest"
import app from "../index.js" // Assuming you have an Express app defined in this file
import { disconnect } from "../conexion.js"

afterAll(async() => {
	await disconnect()
	app.close()
})


describe("GET /ranking/:channelname", () => {
	it("should return the ranking for the specified channel", async () => {
		const channelName = "newpredatorrrrrr" // Replace with the desired channel name

		 await request(app)
			.get(`/api/ranking/${channelName}`)
			.expect(200)
		
	})

	it("should return just 1 value if the limit is 1", async () => {
		const channelName = "newpredatorrrrrr" // Replace with the desired channel name
		const limit = 1

		await request(app)
			.get(`/api/ranking/${channelName}?limit=${limit}`)
			.expect(200)
	})

	it("should return 404 if the channel does not exist", async () => {
		const nonExistentChannel = "nonExistentChannel" // Replace with a non-existent channel name

		await request(app)
			.get(`/api/ranking/${nonExistentChannel}`)
			.expect(404)

		// Add your assertions here to validate the response
		// For example, you can check if the response body contains an error message
		// ...
	})
})