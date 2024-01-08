import { Client } from "pg"

class Database {

	static OpenConnection(): Client {
		return new Client( {
			port: parseInt( <string> process.env.DATABASE_PORT ),
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_NAME,
			password: process.env.DATABASE_PASSWORD,
			user: process.env.DATABASE_USER
		} )
	}

}

export default Database