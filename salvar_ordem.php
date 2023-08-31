<?php
include("conexao.php");

// Obtém os dados do formulário
$codigo_ativo = $_POST['ativoCompra']; 
$tipo = $_POST['tipo'];
$quantidade = $_POST['quantidade'];
$valor = $_POST['valorOrdemCompra']; 
$data = date('Y-m-d'); // Data atual

// Prepara e executa a consulta SQL
$query = "INSERT INTO ordem (codigo_ativo, tipo, quantidade, valor, data) 
                     VALUES ('$codigo_ativo', '$tipo', '$quantidade', '$valor', '$data')";
$result = $conexao->query($query);

if ($result) {
    $conexao->close();
    ?>
    <script>
    alert("Ordem enviada com sucesso");
    window.location.href = "index.php";
    </script>
    <?php
} else {
    echo "Erro: " . $conexao->error;
}
?>
