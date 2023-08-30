//mostrar a tela de compra de ativos quando clicar no botão comprar
document.getElementById("comprar").addEventListener("click", function() {
var ativo = document.getElementById("ativo").value;

if (ativo.trim() !== "") {
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
            // Ativo existe no banco de dados, exibir tela de compra
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
            .then(data => {
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

// Função para cancelar compra
function cancelarCompra() {
    document.getElementById("telaCompra").style.display = "none"; // Esconde a tela de compra
  }

//mostrar a tela de venda de ativos quando clicar no botão vender
document.getElementById("vender").addEventListener("click", function() {
var ativo = document.getElementById("ativo").value;

if (ativo.trim() !== "") {
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
            .then(data => {
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

// Função para cancelar venda
function cancelarVenda() {
    document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de venda
  }

//mostrar resultado da pesquisa de ativos
document.querySelector("[name='pesquisar']").addEventListener("click", function(event) {
event.preventDefault();// Impede o envio do formulário

var ativo = document.getElementById("ativo").value;

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
        // Ativo existe no banco de dados, exibir resultado da pesquisa
        var tabelaResultado = document.getElementById("tabelaResultado");
        tabelaResultado.innerHTML = `
            <tr>
                <td>${ativo}</td>
                <td>${data.preco}</td>
            </tr>
        `;

        document.getElementById("resultadoPesquisa").style.display = "block";
        document.getElementById("telaVenda").style.display = "none"; // Esconde a tela de venda
        document.getElementById("telaCompra").style.display = "none"; // Esconde a tela de compra   
    } else {
        alert("Ativo não encontrado no banco de dados.");
    }
})
.catch(error => console.error("Erro na requisição: " + error));
});

// Atualizar o valor da ordem ao alterar a quantidade
document.getElementById("quantidadeCompra").addEventListener("input", function() {
    calcularValorOrdem('compra');
  });
  
  document.getElementById("quantidadeVenda").addEventListener("input", function() {
    calcularValorOrdem('venda');
  });
  
  // Função para confirmar compra
  function confirmarCompra() {
    var ativo = document.getElementById("ativoCompra").value;
    var quantidade = parseFloat(document.getElementById("quantidadeCompra").value);
    var valorAtivo = parseFloat(document.getElementById("valorAtivoCompra").textContent);
    var valorOrdem = parseFloat(document.getElementById("valorOrdemCompra").textContent);
  
    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Quantidade inválida. Preencha um valor válido.");
      return;
    }
  
    var dataAtual = new Date().toISOString().split('T')[0]; // Obter a data atual no formato YYYY-MM-DD
  
    // Enviar os dados para o backend
    fetch("salvar_operacao.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ativo: ativo,
        quantidade: quantidade,
        valorAtivo: valorAtivo,
        valorOrdem: valorOrdem,
        data: dataAtual
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Operação de compra realizada com sucesso!");
        document.getElementById("telaCompra").style.display = "none";
        document.getElementById("resultadoPesquisa").style.display = "block";
      } else {
        alert("Erro ao realizar a operação de compra.");
      }
    })
    .catch(error => console.error("Erro na requisição: " + error));
  }

// Calcular o valor da ordem de compra/venda
function calcularValorOrdem(tipo) {
var quantidadeElement = document.getElementById("quantidade" + tipo);
var valorAtivoElement = document.getElementById("valorAtivo" + tipo);

var quantidade = parseFloat(quantidadeElement.value); // Esta linha gera o erro
var valorAtivo = parseFloat(valorAtivoElement.textContent);

if (!isNaN(quantidade) && !isNaN(valorAtivo)) {
    var valorOrdem = quantidade * valorAtivo;
    var valorOrdemElement = document.getElementById("valorOrdem" + tipo);
    valorOrdemElement.textContent = valorOrdem.toFixed(2);
}
}