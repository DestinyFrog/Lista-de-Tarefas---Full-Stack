<!DOCTYPE html>
<html lang="pt-BR">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>

	<link rel="stylesheet" href="./style.css"/>
	<link rel="stylesheet" href="/global.css"/>
</head>

<body>
	<main>
		<div>
			<h1>Login</h1>
			<form method="POST" action="./">
				<input type="text" id="inp_nome" name="nome" placeholder="nome de usuario" required />
				<input type="password" id="inp_senha" name="senha" placeholder="****" required />

				<p id="log">
<?php
	if ($_SERVER['REQUEST_METHOD'] === 'POST'){

		$options = array(
			CURLOPT_URL => 'http://localhost:3000/auth/login',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
			CURLOPT_POSTFIELDS => json_encode(
				array(
					'nome' => $_POST["nome"],
					'senha' => $_POST["senha"]
				)
			)
		);

		$ch = curl_init();
		curl_setopt_array($ch, $options);
		
		$result = json_decode( curl_exec($ch), true );
		$info = curl_getinfo($ch);

		$status_code = $info["http_code"];

		curl_close( $ch );

		if($status_code != 200){
			echo $result["msg"];
		} else {
			setcookie( "jwt", $result["jwt"], time() + (86400 * 30), "/" );
			header('Location: /home');
		}
	}
?>
				</p>

				<button id="but_submit">Login</button>

				<p>Ainda não tem conta ? <a href="/cadastro">Crie uma!</a> </p>
			</form>
		</div>
	</main>

	<script src="./script.js"></script>
</body>

</html>