import {MongoClient} from "mongodb"
const client = new MongoClient(process.env.DB_URL)
const db = client.db("Carnets")
async function connect() {
	try {
		await client.connect()
		console.log("Conectado a la base de datos")
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

export {connect, db}