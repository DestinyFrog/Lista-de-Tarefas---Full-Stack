import { Request, Response, Router } from "express"
import jwt from "jsonwebtoken"
import Usuario from "../models/UsuarioRepos"
import Notas, { NotasRequest } from "../models/NotasRepos"

const route = Router()

route.get("/", async (req:Request, res:Response) => {
	const token_jwt = req.cookies["jwt"]

	if ( token_jwt == undefined )
		return res
			.status(422)
			.json({msg: "Usuário Não logado"})

	const decoded_token_jwt = jwt.verify( token_jwt, process.env.SECRET )

	const id = decoded_token_jwt["id"]

	if ( await Usuario.GetOneById(id) == undefined )
		return res
			.status(422)
			.json({msg: "Usuário não encontrado"})

	const data = await Notas.GetByUsuario( id )
	res
		.status(200)
		.json({data: data})
})

route.post("/", async (req:Request, res:Response) => {
	const token_jwt = req.cookies["jwt"]

	if ( token_jwt == undefined )
		return res
			.status(422)
			.json({msg: "Usuário Não logado"})

	const decoded_token_jwt = jwt.verify( token_jwt, process.env.SECRET )
	const id = decoded_token_jwt["id"]

	const { titulo, conteudo, data_de_conclusao } = req.body

	const req_body:NotasRequest = {
		titulo: titulo,
		conteudo: conteudo,
		usuario_id: id,
		data_de_conclusao: data_de_conclusao
	}

	const new_id = await Notas.CreateOne( req_body )

	res
		.status(200)
		.json({data: new_id})
})

route.put("/concluir/:id", async (req:Request, res:Response) => {
	const token_jwt = req.cookies["jwt"]
	const id = <number><unknown> req.params["id"]

	if ( token_jwt == undefined )
		return res
			.status(422)
			.json({msg: "Usuário Não logado"})

	await ( await Notas.GetOneById( id ) ).Conclude()

	res
		.status(200)
		.json( { msg: "Editado com sucesso" } )
})

route.delete("/:id", async (req:Request, res:Response) => {
	const token_jwt = req.cookies["jwt"]
	const id = <number><unknown> req.params["id"]

	if ( token_jwt == undefined )
		return res
			.status(422)
			.json({msg: "Usuário Não logado"})

	await ( await Notas.GetOneById( id ) ).Delete()

	res
		.status(200)
		.json( { msg: "Deletado com sucesso" } )
})

export default route