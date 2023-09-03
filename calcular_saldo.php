<?php
include("conexao.php");

// Consulta as ordens de compra e venda para o ativo específico
$codigo_ativo = $_POST['ativo']; // O ativo que você deseja consultar

$consulta_ordens = "SELECT tipo, quantidade, valor FROM ordem WHERE codigo_ativo = '$codigo_ativo'";
$resultado_ordens = $conexao->query($consulta_ordens);

$saldo = 0;

while ($row = $resultado_ordens->fetch_assoc()) {
    $tipo = $row['tipo'];
    $quantidade = $row['quantidade'];
    $valor = $row['valor'];

    if ($tipo == 1) { // Ordem de Compra
        $saldo += $quantidade * $valor;
    } elseif ($tipo == 2) { // Ordem de Venda
        $saldo -= $quantidade * $valor;
    }
}

// $saldo agora contém o saldo final após calcular todas as ordens de compra e venda
echo "Saldo: R$ " . number_format($saldo, 2, ',', '.');
?>