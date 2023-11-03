import express from "express"
//import { rankingRouter } from './routes/ranking.js'
import {connect} from "./conexion.js"
import apiRouter from "./Routes/apiV1/api.js"
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3000

app.disable("x-powered-by")
app.use(cors())

app.listen(PORT, () => {
	console.log(process.cwd())
	console.log(`Aplicación iniciada en el puerto ${PORT}!`)
	connect()
}) 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(express.static("public"))
app.get("/", (req, res) => {
	res.sendFile("index.html", {root: "./public/"})
})

app.use("/api", apiRouter)
