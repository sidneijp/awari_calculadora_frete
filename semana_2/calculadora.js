// 03 Linguagem Javascript - Calculadora de Fretes
function calculaFrete(endereco, nome_produto) {
    const mensagem = `Olá, boas vindas à nossa Loja.\nJá recebemos as informações e iremos mandar o produto ${nome_produto} para ${endereco}`
    console.log(mensagem);
}

endereco = "Fortaleza - CE"
nome_produto = "Camiseta da Awari"

calculaFrete(endereco, nome_produto)
