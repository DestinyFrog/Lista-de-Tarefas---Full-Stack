<?php
	date_default_timezone_set('America/Sao_Paulo');

	if ( !$_COOKIE["jwt"] ){
		header('Location: /login');
		exit(0);
	}

	if ( array_key_exists( "concluir", $_GET ) ) {
		$id = $_GET["concluir"];

		$options = array(
			CURLOPT_URL => 'http://localhost:3000/notas/concluir/'.$id,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_CUSTOMREQUEST => "PUT",
			CURLOPT_COOKIE => 'jwt='.$_COOKIE["jwt"].';'
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
			header('Location: /home');
			exit(0);
		}
	}

	if ( array_key_exists( "delete", $_GET ) ) {
		$id = $_GET["delete"];

		$options = array(
			CURLOPT_URL => 'http://localhost:3000/notas/'.$id,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_CUSTOMREQUEST => "DELETE",
			CURLOPT_COOKIE => 'jwt='.$_COOKIE["jwt"].';'
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
			header('Location: /home');
			exit(0);
		}
	}

	if ($_SERVER['REQUEST_METHOD'] === 'POST'){
		$d = $_POST["data_de_conclusao"]."T".$_POST["horario_de_conclusao"];

		$options = array(
			CURLOPT_URL => 'http://localhost:3000/notas',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
			CURLOPT_COOKIE => 'jwt='.$_COOKIE["jwt"].';',
			CURLOPT_POSTFIELDS => json_encode(
				array(
					'titulo' => $_POST["titulo"],
					'conteudo' => $_POST["conteudo"],
					'data_de_conclusao' => $d
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
		}
	}

	$options = array(
		CURLOPT_URL => 'http://localhost:3000/notas',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_COOKIE => 'jwt='.$_COOKIE["jwt"].';'
	);

	$ch = curl_init();
	curl_setopt_array($ch, $options);

	$result = json_decode( curl_exec($ch), true );
	$data = $result["data"];
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Home</title>

	<link rel="stylesheet" href="./style.css"/>
	<link rel="stylesheet" href="/global.css"/>
</head>

<body>
	<form method="POST">
		<input required type="text" name="titulo" id="inp_titulo" placeholder="Título">
		<div>
			<input type="date" name="data_de_conclusao" id="inp_date"/>
			<input type="time" name="horario_de_conclusao" value="00:00" id="inp_horario"/>
		</div>
		<textarea name="conteudo" id="inp_conteudo" rows="3" placeholder="Descricao"></textarea>

		<hr>

		<div>
			<input type="reset" value="Cancelar">
			<input type="submit" value="Adicionar Tarefa">
		</div>
	</form>

	<main id="main_data">

	<?php for ($i=0; $i < count($data); ++$i) { ?>
		<div class="each_notas">
			<h1> <?php echo $data[$i]["titulo"] ?> </h1>
			<p> <?php echo date_format( date_create( $data[$i]["data_de_conclusao"] ), "d/m/Y H:i" ); ?> </p>
			<hr>
			<p> <?php echo $data[$i]["conteudo"] ?> </p>
			<a href="<?php echo '?concluir='.($data[$i]['id']); ?>" class="each_notas_status">
				<?php if ( $data[$i]["concluido"] ){ echo "👍 ".(date_format( date_create( $data[$i]["concluido_em"] ), "d/m/Y H:i" )); } else { echo "❌"; } ?> </a>
			<a href="<?php echo '?delete='.($data[$i]['id']); ?>" >🗑️</a>
		</div>
	<?php } ?>

	</main>

	<a href="/sair.php" id="but_sair">Sair</a>
	<script>
		document.getElementById("inp_date").valueAsDate = new Date()
	</script>
</body>

</html>