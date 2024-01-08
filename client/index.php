
<?php

	if ( $_COOKIE["jwt"] ){
		header('Location: /home');
	} else {
		header('Location: /login');
	}
?>