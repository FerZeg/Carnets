import express from "express"
import cookieParser from "cookie-parser"
//import { rankingRouter } from './routes/ranking.js'
import {connect} from "./conexion.js"
import authRouter from "./Routes/auth.js"
import apiRouter from "./Routes/api/api.js"
const app = express()
const PORT = process.env.PORT || 3000

app.disable("x-powered-by")

app.listen(PORT, () => {
	console.log(process.cwd())
	console.log(`Aplicación iniciada en el puerto ${PORT}!`)
	connect()
}) 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
//app.use('/ranking', rankingRouter)

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/Views/index.html")
})
app.use("/api", apiRouter)
app.use("/auth", authRouter)

// eslint-disable-next-line no-unused-vars
app.use((req,res) => {
	res.status(404).sendFile(process.cwd() + "/Views/404.html")
})
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(500).sendFile(process.cwd() + "/Views/500.html")
})