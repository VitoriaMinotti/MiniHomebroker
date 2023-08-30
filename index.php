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

<div class="form col-md-auto">
    <h2>Mini Homebroker</h2>
    <form action="" method="post">
    <input type="text" id="ativo" name="ativo" placeholder="Ativo" required>
    <button class="btn btn-success" type="button" id="comprar">Comprar</button>
    <button class="btn btn-danger" type="button" id="vender">Vender</button>
    <button class="btn btn-primary" type="submit" name="pesquisar">Pesquisar</button>
    </form>

    <!-- tela de pesquisa, só aparece ao clicar no botão de pesquisar -->
    <div id="resultadoPesquisa" style="display: none;">
        <br><br>
        <h2>Resultado da Pesquisa</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Ativo</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody id="tabelaResultado"></tbody>
        </table>
    </div>
</div>

    <!-- tela de comprar ativo, só aparece ao clicar no botão de comprar -->
<div class="container mt-3" id="telaCompra" style="display: none;">
    <h2 style="color:green;">Compra de Ativo</h2>
    <input type="text" id="ativoCompra" placeholder="Ativo" disabled>
    <label for="valorAtivoCompra">Valor do Ativo:</label>
    <span id="valorAtivoCompra"></span>
    <input type="number" id="quantidadeCompra" placeholder="Quantidade" oninput="calcularValorOrdem('compra')">
    <label for="valorOrdem">Valor da Ordem:</label>
    <span id="valorOrdem"></span>
    <button class="btn btn-success" onclick="confirmarCompra()">Confirmar</button>
    <button class="btn btn-danger" onclick="cancelarCompra()">Cancelar</button>
</div>

<!-- tela de vender ativo, só aparece ao clicar no botão de vender -->
<div class="container mt-3" id="telaVenda" style="display: none;">
    <h2 style="color:red;">Venda de Ativo</h2>
    <input type="text" id="ativoVenda" placeholder="Ativo" disabled>
    <label for="valorAtivoVenda">Valor do Ativo:</label>
    <span id="valorAtivoVenda"></span>
    <input type="number" id="quantidadeVenda" placeholder="Quantidade" oninput="calcularValorOrdem('venda')">
    <label for="valorOrdemVenda">Valor da Ordem:</label>
    <span id="valorOrdemVenda"></span>
    <button class="btn btn-success" onclick="confirmarVenda()">Confirmar</button>
    <button class="btn btn-danger" onclick="cancelarVenda()">Cancelar</button>
</div>


<script src="script.js"></script>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</body>
</html>