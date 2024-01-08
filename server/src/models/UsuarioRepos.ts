
import Database from "../service/database"

export interface UsuarioRequest {
	nome:string
	senha:string
}

class Usuario {
	public id:number
	public nome:string
	private senha:string

	public verificarSenha(senha:string) {
		return this.senha == senha
	}

	constructor( {id, nome, senha} ) {
		this.id = id
		this.nome = nome
		this.senha = senha
	}

	public static async GetAll(): Promise<Usuario[]> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("SELECT * FROM Usuarios")
		conn.end()

		const data = res.rows.map( t => new Usuario(t) )
		return data
	}

	public static async GetOneById( id:number ): Promise<Usuario> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Usuarios WHERE id = $1`, [ id ])
		conn.end()

		const data = new Usuario( res.rows[0] )
		return data
	}

	public static async GetOneByNome( nome:string ): Promise<Usuario|undefined> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Usuarios WHERE nome = $1`, [ nome ])
		conn.end()

		if ( res.rows.length == 0 )
			return undefined

		const data = new Usuario( res.rows[0] )
		return data
	}

	public static async GetOneBy( chave:string, valor:string|number ): Promise<Usuario> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Usuarios WHERE $1 = $2`, [ chave, valor ])
		conn.end()

		const data = new Usuario( res.rows[0] )
		return data
	}

	public static async CreateOne( { nome, senha }:UsuarioRequest ): Promise<number> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("INSERT INTO Usuarios ( nome, senha ) VALUES ( $1, $2 ) RETURNING id", [ nome, senha ])
		conn.end()

		const data = res.rows[0]
		return data
	}

	public static async UpdateOne( id:number, { nome, senha }:UsuarioRequest ): Promise<Usuario> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("UPDATE Usuarios SET nome=$2, senha=$3 WHERE id = $1 RETURNING *", [ id, nome, senha ])
		conn.end()

		const data = new Usuario( res.rows[0] )
		return data
	}

	public static async DeleteOne( id:number ): Promise<void> {
		const conn = Database.OpenConnection()
		conn.connect()
		await conn.query("DELETE FROM Usuarios WHERE id = $1", [ id ])
		conn.end()
	}
}

export default Usuario