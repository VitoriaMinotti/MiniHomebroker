<?php
$Servidor = "localhost";
$User = "root";
$Senha = "";
$dbname = "bd_teste";

$conexao = mysqli_connect($Servidor, $User, $Senha, $dbname);

// Verificar a conexão
if (!$conexao) {
    die("Falha ao se conectar ao Banco de Dados: " . mysqli_connect_error());
}

// Definir o charset para UTF-8
mysqli_set_charset($conexao, "utf8");


?>
