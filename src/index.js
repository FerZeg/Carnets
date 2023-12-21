import "dotenv/config"
import express from "express"
import {connect} from "./conexion.js"
import apiRouter from "./Routes/apiV1/api.js"
import cors from "cors"
//import {init} from "./tasks.js"
const app = express()
const PORT = process.env.PORT || 3000

app.disable("x-powered-by")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/api", apiRouter)

let server 
if(process.env.NODE_ENV === "development"){
	server = app.listen(PORT, () => {
		console.log(`Aplicación iniciada en el puerto ${PORT}!`)
		connect()
	})
}
	

export default server
