import Express, { Request, Response } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import AuthController from "./routes/AuthController"
import NotasController from "./routes/NotasController"

console.clear()
dotenv.config()

const app = Express()

// middlewares
app.use( Express.json() )
app.use( cookieParser() )
app.use( cors() )

// routes
app.use( "/", Express.static( "views/static" ) )
app.use( "/auth", AuthController )
app.use( "/notas", NotasController )

app.get("/", (req:Request, res:Response) => {
	res.json( { msg: "Hello, World !!" } )
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
	console.log(`Listening at :${PORT}`))