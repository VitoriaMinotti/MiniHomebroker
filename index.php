<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini Homebroker</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- tela inicial -->
<div class="container col-6">
    <div class="form col-md-auto">
        <h1>Mini Homebroker</h1>
        <form action="" method="post">
            <input type="text" id="ativo" name="codigo_ativo" placeholder="Ativo" required>
            <button class="btn btn-success" type="button" id="comprar">Comprar</button>
            <button class="btn btn-danger" type="button" id="vender">Vender</button>
            <button class="btn btn-primary" type="submit" name="pesquisar">Pesquisar</button>
        </form>
    </div>

    <!-- tela de pesquisa, só aparece ao clicar no botão de pesquisar -->
    <div class="container" style="display: none;" id="resultadoPesquisa">
    <br>
    <div id="saldo">
        <h4>Saldo</h4>
        <span id="saldoValor"></span>
    </div>
        <table class="table mt-3" id="tabelaOperacoes" >
        <thead>
            <tr>
                <th>Operações</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
            <!-- As operações serão preenchidas dinamicamente com JavaScript -->
        </tbody>
        </table>
        <!-- Botão Limpar -->
        <button class="btn btn-secondary" onclick="limparPesquisa()">Limpar</button>
    </div>

    <!-- tela de comprar ativo, só aparece ao clicar no botão de comprar -->
    <div class="container form mt-3" id="telaCompra" style="display: none;">
        <h2 style="color:green;">Compra de Ativo</h2>
        <form action="salvar_ordem.php" method="post">
            <input type="text" name="ativoCompra" id="ativoCompra" placeholder="Ativo" readonly>
            <label for="valorAtivoCompra">Valor do Ativo:</label>
            <span id="valorAtivoCompra"></span>
            <input type="number" name="quantidade" id="quantidadeCompra" placeholder="Quantidade" oninput="calcularValorOrdem('compra')">
            <label for="valorOrdem">Valor da Ordem:</label>
            <span id="valorOrdem" name="valorOrdemCompra"></span>
            <input type="hidden" id="valorOrdemHidden" name="valorOrdemCompra"/>
            <input type="hidden" name="tipo" value="1"> <!-- 1 para Compra -->
            <div class="container">
                <br>
                <button type="submit" class="btn btn-success">Confirmar</button>
            </form>
                <button type="button" class="btn btn-danger" onclick="cancelarCompra()">Cancelar</button>
            </div>
    </div>

    <!-- tela de comprar ativo, só aparece ao clicar no botão de comprar -->
    <div class="container form mt-3" id="telaVenda" style="display: none;">
        <h2 style="color:red;">Venda de Ativo</h2>
        <form action="salvar_venda.php" method="post">
            <input type="text" name="ativoVenda" id="ativoVenda" placeholder="Ativo" readonly>
            <label for="valorAtivoVenda">Valor do Ativo:</label>
            <span id="valorAtivoVenda"></span>
            <input type="number" id="quantidadeVenda" name="quantidadeVenda" placeholder="Quantidade" oninput="calcularValorOrdem('venda')">
            <label for="valorOrdemVenda">Valor da Ordem:</label>
            <span id="valorOrdemVenda" name="valorVenda"></span>
            <input type="hidden" id="valorOrdemVenda" name="valorVenda"/>
            <input type="hidden" name="tipo" value="2"> <!-- 2 para Venda -->
            <div class="container">
                <br>
                <button type="submit" class="btn btn-success">Confirmar</button>
            </form>
                <button type="button" class="btn btn-danger" onclick="cancelarVenda()">Cancelar</button>
            </div>
    </div>

</div>

<script src="script.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</body>
</html>