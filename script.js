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
    var valorAtivoElement = tipo === 'venda' ? document.getElementById("valorAtivoVenda") : document.getElementById("valorAtivoCompra");
    var quantidadeElement = tipo === 'venda' ? document.getElementById("quantidadeVenda") : document.getElementById("quantidadeCompra");
    var valorOrdemSpan = tipo === 'venda' ? document.getElementById("valorOrdemVenda") : document.getElementById("valorOrdem");
    
    var valorAtivo = parseFloat(valorAtivoElement.textContent);
    var quantidade = parseFloat(quantidadeElement.value);
    
    if (!isNaN(valorAtivo) && !isNaN(quantidade)) {
        var valorOrdem = quantidade * valorAtivo;
        valorOrdemSpan.textContent = valorOrdem.toFixed(2);
        document.getElementById('valorOrdemHidden').value = valorOrdem.toFixed(2); // Atualizar o campo oculto
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

//mostrar a tela de venda de ativos quando clicar no botão vender
document.getElementById("vender").addEventListener("click", function() { 
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
    .then(data => {
        if (data.exists) {
            // Ativo existe no banco de dados, exibir tela de venda
            document.getElementById("telaCompra").style.display = "none"; // Esconder tela de compra
            document.getElementById("resultadoPesquisa").style.display = "none"; // Esconde a tela de pesquisa
            document.getElementById("telaVenda").style.display = "block"; // Mostrar tela de venda
            document.getElementById("ativoVenda").value = ativo; // Preencher campo de ativo na tela de venda
            

            // Consultar o banco de dados para obter o valor do ativo
            fetch("verificar_ativo.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "ativo=" + encodeURIComponent(ativo)
            })
            .then(response => response.json())
            .then(data => { //preenche o valor do ativo na tela de venda
                if (data.preco) {
                    document.getElementById("valorAtivoVenda").textContent = data.preco;
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
    document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de venda
  }

//mostrar resultado da pesquisa de ativos quando clicar no botão pesquisar
document.querySelector("[name='pesquisar']").addEventListener("click", function(event) {
event.preventDefault();// Impede o envio do formulário e 

var ativo = document.getElementById("ativo").value; //salva oq foi entrado no input ativo

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
        // Ativo existe no banco de dados, exibir resultado da pesquisa
        var tabelaResultado = document.getElementById("tabelaResultado");
        tabelaResultado.innerHTML = `
            <tr> 
                <td>${ativo}</td>
                <td>${data.preco}</td>
            </tr>
        `; // Preenche a tabela com o ativo e o valor do ativo pesquisado no banco de dados  

        document.getElementById("resultadoPesquisa").style.display = "block"; // Mostrar tela de resultado da pesquisa
        document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de venda
        document.getElementById("telaCompra").style.display = "none"; // Esconde a tela de compra   
        
    } else {
        alert("Ativo não encontrado no banco de dados.");
    }
})
.catch(error => console.error("Erro na requisição: " + error));
});
