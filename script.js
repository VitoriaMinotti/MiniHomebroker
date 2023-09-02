//mostrar a tela de compra de ativos quando clicar no botão comprar
document.getElementById("comprar").addEventListener("click", function() {
var ativo = document.getElementById("ativo").value; //salva oq foi entrado no input ativo 

if (ativo.trim() !== "") { //usa o trim para verificar os espaços em branco
    fetch("verificar_ativo.php", { //faz a requisição para o php
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded", 
        },
        body: "ativo=" + encodeURIComponent(ativo)
    })
    .then(response => response.json())
    .then(data => { //verifica se o ativo existe no banco de dados
        if (data.exists) { 
            // Se Ativo existe no banco de dados, exibir tela de compra
            document.getElementById("telaVenda").style.display = "none"; // Esconder tela de venda
            document.getElementById("resultadoPesquisa").style.display = "none"; // Esconde a tela de pesquisa
            document.getElementById("telaCompra").style.display = "block"; // Mostrar tela de compra
            document.getElementById("ativoCompra").value = ativo; // Preencher campo de ativo na tela de compra

            // Consultar o banco de dados para obter o valor do ativo
            fetch("verificar_ativo.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "ativo=" + encodeURIComponent(ativo)
            })
            .then(response => response.json())
            .then(data => { //preenche o valor do ativo na tela de compra
                if (data.preco) { 
                    document.getElementById("valorAtivoCompra").textContent = data.preco; 
                }
            })
            .catch(error => console.error("Erro na requisição: " + error));
        } else {
            alert("Ativo não encontrado no banco de dados.");
        }
    })
    .catch(error => console.error("Erro na requisição: " + error));
} else {
    alert("Preencha o campo 'Ativo' antes de comprar.");
}
});

// Função para calcular o valor da ordem de compra quando o usuário digitar a quantidade de ativos
function calcularValorOrdem(tipo) {
    var valorAtivoElement = tipo === 'venda' ? document.getElementById("valorAtivoVenda") : document.getElementById("valorAtivoCompra"); // Verificar se é compra ou venda 
    var quantidadeElement = tipo === 'venda' ? document.getElementById("quantidadeVenda") : document.getElementById("quantidadeCompra"); 
    var valorOrdemSpan = tipo === 'venda' ? document.getElementById("valorOrdemVenda") : document.getElementById("valorOrdem"); 
    
    var valorAtivo = parseFloat(valorAtivoElement.textContent); 
    var quantidade = parseFloat(quantidadeElement.value);
    
    if (!isNaN(valorAtivo) && !isNaN(quantidade)) { 
        var valorOrdem = quantidade * valorAtivo;
        valorOrdemSpan.textContent = valorOrdem.toFixed(2);
        document.getElementById('valorOrdemHidden').value = valorOrdem.toFixed(2); // Atualizar o campo oculto com o valor da ordem de compra ou venda 
    } else {
        valorOrdemSpan.textContent = "Insira valores numéricos válidos.";
        document.getElementById('valorOrdemHidden').value = ""; // Resetar o campo oculto se houver um erro
    }
}

// Função para cancelar compra quando clicar no botão cancelar
function cancelarCompra() {
    document.getElementById("telaCompra").style.display = "none"; // Esconde a tela de compra
     // Apaga o número digitado no campo de quantidade
     document.getElementById("quantidadeCompra").value = "";
  }

// Mostrar a tela de venda de ativos quando clicar no botão "Vender"
document.getElementById("vender").addEventListener("click", function() {
    var ativo = document.getElementById("ativo").value;

    if (ativo.trim() !== "") {
        // Realizar uma requisição para verificar se o ativo existe no banco de dados
        fetch("verificar_ativo.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "ativo=" + encodeURIComponent(ativo)
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                // Se o ativo existe no banco de dados, exibir a tela de venda
                document.getElementById("telaCompra").style.display = "none"; // Esconder a tela de compra
                document.getElementById("resultadoPesquisa").style.display = "none"; // Esconder a tela de pesquisa
                document.getElementById("telaVenda").style.display = "block"; // Mostrar a tela de venda
                document.getElementById("ativoVenda").value = ativo; // Preencher o campo de ativo na tela de venda

                // Consultar o banco de dados para obter o valor do ativo
                fetch("verificar_ativo.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: "ativo=" + encodeURIComponent(ativo)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.preco) {
                        document.getElementById("valorAtivoVenda").textContent = data.preco; // Preencher o valor do ativo na tela de venda
                    }
                })
                .catch(error => console.error("Erro na requisição: " + error));
            } else {
                alert("Ativo não encontrado no banco de dados.");
            }
        })
        .catch(error => console.error("Erro na requisição: " + error));
    } else {
        alert("Preencha o campo 'Ativo' antes de vender.");
    }
});


// Função para cancelar venda quando clicar no botão cancelar
function cancelarVenda() {
    document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de compra
     // Apaga o número digitado no campo de quantidade
     document.getElementById("quantidade").value = "";
  }

//função para pesquisar o ativo	
document.querySelector("[name='pesquisar']").addEventListener("click", function(event) {
    event.preventDefault();

    var ativo = document.getElementById("ativo").value;

    fetch("pesquisar_ativo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "ativo=" + encodeURIComponent(ativo)
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            var tabelaOperacoes = document.getElementById("tabelaOperacoes");
            tabelaOperacoes.innerHTML = `
                <thead>
                    <tr>
                        <th>Operação</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `; // Limpa a tabela antes de preencher com os resultados

            var operacoes = data.operacoes;
            var operacoesAgrupadas = {}; // Objeto para agrupar operações pelo tipo

            // Agrupa as operações pelo tipo (Compra ou Venda)
            operacoes.forEach(function(operacao) {
                var tipo = operacao.tipo === 1 ? "Venda" : "Compra";
                if (!operacoesAgrupadas[tipo]) {
                    operacoesAgrupadas[tipo] = { quantidade: 0, valorTotal: 0, data: operacao.data };
                }
                operacoesAgrupadas[tipo].quantidade += parseInt(operacao.quantidade); // Converta para inteiro antes de somar
                operacoesAgrupadas[tipo].valorTotal += operacao.valor;
            });

            // Preenche a tabela com as operações agrupadas
            for (var tipo in operacoesAgrupadas) {
                var quantidade = operacoesAgrupadas[tipo].quantidade;
                var valorTotal = operacoesAgrupadas[tipo].valorTotal.toFixed(2);
                var dataOperacao = operacoesAgrupadas[tipo].data;

                // Função para formatar a data no formato dd/mm/yyyy
                function formatarDataParaBrasileiro(data) {
                    const dataObj = new Date(data);
                    const dia = dataObj.getDate().toString().padStart(2, '0');
                    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
                    const ano = dataObj.getFullYear();
                    return dia + '/' + mes + '/' + ano;
                }

                var dataFormatada = formatarDataParaBrasileiro(dataOperacao);

                var newRow = tabelaOperacoes.getElementsByTagName('tbody')[0].insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = tipo + " " + quantidade + " unidades: R$ " + valorTotal;
                cell2.innerHTML = dataFormatada;
            }

            document.getElementById("resultadoPesquisa").style.display = "block";
            document.getElementById("telaVenda").style.display = "none";
            document.getElementById("telaCompra").style.display = "none";

        } else {
            alert("Ativo não encontrado no banco de dados.");
        }
    })
    .catch(error => console.error("Erro na requisição: " + error));
});



function limparPesquisa() {
    document.getElementById("ativo").value = ""; // Limpa o input
    var tabelaOperacoes = document.getElementById("tabelaOperacoes");
    tabelaOperacoes.innerHTML = `
        <thead>
            <tr>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Data</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `; // Limpa a tabela de operações
    document.getElementById("resultadoPesquisa").style.display = "none"; // Esconde a tela de resultado da pesquisa
    document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de venda
    document.getElementById("telaCompra").style.display = "none"; // Esconde a tela de compra
}