<?php
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ativo = $_POST["ativo"];
    
    $query = "SELECT preco FROM ativo WHERE codigo = '$ativo'";
    $result = $conexao->query($query);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $preco = $row['preco'];

        // Retornar o resultado como JSON, incluindo o preço
        echo json_encode(array("exists" => true, "preco" => $preco));
    } else {
        // Retornar um erro caso a consulta falhe ou o ativo não exista
        echo json_encode(array("exists" => false));
    }
}

?>