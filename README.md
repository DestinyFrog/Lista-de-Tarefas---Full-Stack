# Controlador de Tarefas

<div>
	<img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/PHP-Dark.svg" />
	<img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/NodeJS-Dark.svg" />
	<img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/PostgreSQL-Dark.svg" />
</div>

### O Projeto

Uma aplicação Full-stack que exerce as funções de uma lista de tarefas.

- Autenticação;
- Criação de Tarefas;
- Apagar Tarefas;
- Conclusão de Tarefas;
- ~~Edição do conteúdo;~~

Cada tarefa contém:
- Título;
- Descrição (opcional);
- Data e Horário para Conclusão;

E cada usuário contém:
- Nome;
- Senha;

### Objetivo

Integrar uma API Rest feita com Express e Typescript para realizar autenticação e se comunicar com o Front-end.

Criar uma página HTMl utilizando PHP para se comunicar com a API e alterar os dados na página, e estilizar utilizando CSS.

### Tecnologias Utilizadas

| Tecnologia | Função |
| --- | --- |
| ___Front-End___ | |
| <img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/PHP-Dark.svg" /> | _* PHP_<br/>Linguagem de Programação utilizada para "desenhar" a página HTML do lado do servidor (SSR) e consumir a API da aplicação. |
| <img width="40" src="https://www.svgrepo.com/show/353400/apache.svg" /> | _* Apache_<br/>Um servidor Web livre onde estão os arquivos PHP e CSS. Eele serve as páginas em um servidor HTTP/HTTPS. |
| ___API___ | |
| <img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/TypeScript.svg" /> | _* TypeScript_<br/>Linguagem de Programação usada para criar a API. |
| <img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/NodeJS-Dark.svg" /> | _* Node.js_<br/>Runtime em Javascript onde a API em Javascript funciona. |
| <img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/ExpressJS-Dark.svg" /> | _* Express.js_<br/>Um Framework _Javascript_ para criar uma aplicação web. Usado para criar as rotas, e enviar e receber requisições HTTP. |
| <img width="40" src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg"/> | _* JWT (Json Web Token)_<br/>Uma biblioteca em Javascript usada para realizar autenticação de forma segura e simples. |
| ___BANCO DE DADOS___ | |
| <img width="40" src="https://raw.githubusercontent.com/tandpfun/skill-icons/de91fca307a83d75fc5b1f6ce24540454acead41/icons/PostgreSQL-Dark.svg" /> | _* PostgreSQL_<br/>Um Banco de Dados Relacional que armazena os dados da aplicação em "Tabelas". |

### Idéias Futuras:

- Edição do conteúdo das Notas;
- Edição do conteúdo de Usuários;
- integrar com contêineres utilizando Docker;