<?php include("conexao.php");?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini Homebroker</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>Mini Homebroker</h1>
        <form action="" method="post">
            <input type="text" name="ativo" placeholder="Digite o nome do Ativo" required>
            <button class="btn btn-success" onclick="abrirCompra()" type="submit" name="comprar">Comprar</button>
            <button class="btn btn-danger" onclick="vender()" type="submit" name="vender">Vender</button>
            <button class="btn btn-info" onclick="pesquisar()" type="submit" name="pesquisar">Pesquisar</button>
        </form>

        <!-- Para consultar o banco de dados e fazer a pesquisa do ativo no banco -->
            <?php
                if (isset($_POST['pesquisar'])) {
                    $ativo = $_POST['ativo'];
                    
                    $query = "SELECT preco FROM ativo WHERE codigo = '$ativo'";
                    $result = $conexao->query($query);
                    
                    if ($result && $result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $preco = $row['preco'];
                        echo "Preço do ativo $ativo: $preco";
                    } else {
                        echo "Ativo não encontrado no banco de dados.";
                    }}
            ?>
        <!-- fim da consulta no BD -->
    </div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="script.js"></script>
</body>
</html>