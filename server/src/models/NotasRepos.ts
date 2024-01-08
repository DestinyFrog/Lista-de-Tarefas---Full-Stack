import Database from "../service/database"

export interface NotasRequest {
	titulo:string
	conteudo:string
	usuario_id:number
	data_de_conclusao:Date
}

class Notas {
	public id:number
	public titulo:string
	public conteudo:string
	public concluido_em:Date
	public concluido:boolean
	public created_at:Date
	public data_de_conclusao:Date

	constructor( {id, titulo, conteudo, created_at, concluido_em, concluido, data_de_conclusao} ) {
		this.id = id
		this.titulo = titulo
		this.conteudo = conteudo
		this.concluido = concluido

		this.created_at = new Date(created_at)
		this.created_at.setTime(this.created_at.getTime() - 3 * 60 * 60 * 1000);

		this.concluido_em = new Date(concluido_em)
		this.concluido_em.setTime(this.concluido_em.getTime() - 3 * 60 * 60 * 1000);

		this.data_de_conclusao = new Date(data_de_conclusao)
		this.data_de_conclusao.setTime(this.data_de_conclusao.getTime() - 3 * 60 * 60 * 1000);
	}

	public static async GetAll(): Promise<Notas[]> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("SELECT notas.*, usuarios.nome AS usuario_nome FROM notas LEFT JOIN usuarios ON usuario_id=usuarios.id ORDER BY created_at")
		conn.end()

		const data = res.rows.map(t => new Notas(t) )
		return data
	}

	public static async GetByUsuario( id:number ): Promise<Notas[]> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Notas WHERE usuario_id = $1 ORDER BY id`, [ id ])
		conn.end()

		const data = res.rows.map(t => new Notas(t))
		return data
	}

	public static async GetOneById( id:number ): Promise<Notas> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Notas WHERE id = $1`, [ id ])
		conn.end()

		const data = new Notas( res.rows[0] )
		return data
	}

	public static async GetOneBy( chave:string, valor:string|number ): Promise<Notas> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query(`SELECT * FROM Notas WHERE $1 = $2`, [ chave, valor ])
		conn.end()

		const data = new Notas( res.rows[0] )
		return data
	}

	public static async CreateOne( { titulo, conteudo, usuario_id, data_de_conclusao }:NotasRequest ): Promise<number> {
		data_de_conclusao = new Date( data_de_conclusao )

		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("INSERT INTO Notas ( titulo, conteudo, usuario_id, data_de_conclusao ) VALUES ( $1, $2, $3, $4 AT TIME ZONE 'America/Sao_Paulo' ) RETURNING id", [ titulo, conteudo, usuario_id, data_de_conclusao ])
		conn.end()

		const data = res.rows[0]
		return data
	}

	public static async UpdateOne( id:number, { titulo, conteudo }:NotasRequest ): Promise<Notas> {
		const conn = Database.OpenConnection()
		conn.connect()
		const res = await conn.query("UPDATE Notas SET titulo=$2, conteudo=$3 WHERE id = $1 RETURNING *", [ id,  titulo, conteudo ])
		conn.end()

		const data = new Notas( res.rows[0] )
		return data
	}

	public async Delete(): Promise<void> {
		const conn = Database.OpenConnection()
		conn.connect()
		await conn.query("DELETE FROM Notas WHERE id = $1", [ this.id ])
		conn.end()
	}

	public async Conclude(): Promise<void> {
		const conn = Database.OpenConnection()
		conn.connect()
		await conn.query("UPDATE Notas SET concluido=TRUE, concluido_em=NOW() WHERE id=$1", [ this.id ])
		conn.end()
	}
}

export default Notas