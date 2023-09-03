<?php
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ativo = $_POST["ativo"];
    
    // Consulta as operações relacionadas ao ativo
    $query = "SELECT tipo, quantidade, valor, data FROM ordem WHERE codigo_ativo = '$ativo'";
    $result = $conexao->query($query);

    if ($result && $result->num_rows > 0) {
        $operacoes = array();
        while ($row = $result->fetch_assoc()) {
            $tipo = $row['tipo'] == 1 ? 'Compra' : 'Venda';
            $quantidade = $row['quantidade'];
            $valor = $row['valor'];
            $data = $row['data'];
            $operacoes[] = array("tipo" => $tipo, "quantidade" => $quantidade, "valor" => $valor, "data" => $data);
        }

        
        // Retornar as operações como JSON
        echo json_encode(array("exists" => true, "operacoes" => $operacoes));
    } else {
        // Retornar um erro caso a consulta não retorne operações
        echo json_encode(array("exists" => false));
    }
}
?>
