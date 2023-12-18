import {MongoClient} from "mongodb"
const client = new MongoClient(process.env.DB_URL)
const db = client.db("Carnets")
async function connect() {
	try {
		await client.connect()
		console.log("Conectado a la base de datos")
		createIndexes()
	} catch (error) {
		console.log("Error conectando a la base de datos", error)
	}
}
export async function disconnect() {
	try {
		return await client.close()
	} catch (error) {
		console.log("Error desconectando de la base de datos", error)
	}
}

client.on("connectionFailed", () => {
	console.log("Conexión fallida")
})
client.on("connectionReconnecting", () => {
	console.log("Conexión reconectando")
})
client.on("connectionReconnected", () => {
	console.log("Conexión reconectada")
})
client.on("connectionLost", () => {
	console.log("Conexión perdida")
})

const createIndexes = () => {
	const userCollection = db.collection("users")
	// Create an index on the twitch_id field
	const userIndexes = [
		{ key: { twitch_id: 1 }, unique: true },
		{ key: { display_name: 1} },
		{ key: { status: 1 } }
	]
	userCollection.createIndexes(userIndexes)
		.then(() => console.log("User indexes created successfully"))
		.catch(error => console.error("Error creating user indexes:", error))
		
	const cardIndexes = [
		{ key: { user_id: 1, channel_id: 1 } },
		{ key: { status: 1 } }
	]
	const cardCollection = db.collection("cards") // Assuming your cards are stored in a "cards" collection
	cardCollection.createIndexes(cardIndexes)
		.then(() => console.log("Card indexes created successfully"))
		.catch(error => console.error("Error creating card indexes:", error))
}

export {connect, db, client}