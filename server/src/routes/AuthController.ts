import { Request, Response, Router } from "express"
import Usuario, { UsuarioRequest } from "../models/UsuarioRepos"
import jwt from "jsonwebtoken"

const route = Router()

route.post("/exit", async (req:Request, res:Response) => {
	res
		.clearCookie("jwt")
		.json({ msg: "Deslogado com sucesso" })
})

route.post("/login", async (req:Request, res:Response) => {
	const { nome, senha }:UsuarioRequest = req.body

	const data = await Usuario.GetOneByNome( nome )

	if ( data == undefined )
		return res
			.status(422)
			.json({ msg: "Usuario não encontrado"} )

	if ( data.verificarSenha( senha ) == false )
		return res
			.status(422)
			.json({ msg: "Senha Incorreta"} )

	const token = jwt.sign(
		{ id: data.id },
		process.env.SECRET )

	res
		.status(200)
		// .cookie("jwt", token)
		.json( {msg: "Logado com Sucesso", jwt: token} )
})

route.post("/cadastro", async (req:Request, res:Response) => {
	const { nome, senha }:UsuarioRequest = req.body

	const data = {
		nome: nome,
		senha: senha
	}

	const id = await Usuario.CreateOne( data )

	res
		.status(200)
		.json( {msg: "Usuario Criado com Sucesso"} )
})

route.post("/check", async (req:Request, res:Response) => {
	const token_jwt = req.cookies["jwt"]

	if ( token_jwt == undefined )
		return res
			.status(422)
			.json({msg: "Usuário Não logado"})

	try {
		const decoded_token_jwt = jwt.verify( token_jwt, process.env.SECRET )

		const id = decoded_token_jwt["id"]

		if ( await Usuario.GetOneById(id) == undefined )
			return res
				.status(422)
				.json({msg: "Usuário não encontrado"})
		else
			return res
				.status(200)
				.json({msg: "Usuário Logado"})
	} catch (err) {
		console.error(err)
	}
})



export default route