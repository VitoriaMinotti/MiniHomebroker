<?php
include("conexao.php");

// Recupera os dados do formulário
$codigo_ativo = $_POST['codigo_ativo'];
$tipo = $_POST['tipo'];
$quantidade = $_POST['quantidade'];
$valor = $_POST['valorOrdem'];
$data = date('Y-m-d'); // Data atual

// Prepara e executa a consulta SQL
$stmt = $conexao->prepare("INSERT INTO Ordem (codigo_ativo, tipo, quantidade, valor, data) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("siids", $codigo_ativo, $tipo, $quantidade, $valor, $data);

if ($stmt->execute()) {
    $stmt->close();
    $conexao->close();

} else {
    echo "Erro: " . $stmt->error;
}
?>
