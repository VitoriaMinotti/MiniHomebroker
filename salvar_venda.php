<?php
include("conexao.php");

// Obtém os dados do formulário
$codigo_ativo = $_POST['ativoVenda']; 
$tipo = $_POST['tipo'];
$quantidade = $_POST['quantidadeVenda'];
$valor = $_POST['valorOrdemVenda']; 
$data = date('Y-m-d'); // Data atual

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
