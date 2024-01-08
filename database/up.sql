CREATE TABLE Usuarios (
	id SERIAL,
	nome VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(100) NOT NULL,

	PRIMARY KEY(id)
);

CREATE TABLE Notas (
	id SERIAL,
	titulo VARCHAR(255) NOT NULL,
	conteudo TEXT,
	usuario_id INT,
	data_de_conclusao TIMESTAMP,

	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	concluido BOOLEAN DEFAULT FALSE,
	concluido_em TIMESTAMP DEFAULT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY(usuario_id) REFERENCES Usuarios(id)
);

INSERT INTO Usuarios (nome, senha)
VALUES
	('usu', '1234'),
	('pedro', 'Framboesa');

INSERT INTO Notas (titulo, conteudo, concluido, usuario_id, data_de_conclusao)
VALUES
	('Estudar Desenvolvimento Web','Verificar as opções de Framworks Front-end e ferramentas de Back-end para: Geração de HTML dinâmico; criação de rotas; acesso a Banco de Dados;', FALSE, 1, '2024-01-11 11:00:00'),
	('Estudar Game Design','Estudar design de jogos, e diferentes Frameworks e Game Engines para jogos 2D e 3D', FALSE, 1, '2024-01-25 11:00:00');
