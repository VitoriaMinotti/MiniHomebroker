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
