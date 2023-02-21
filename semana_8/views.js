function freteJsonResponse(dados) {
    return {
        prazo: dados.PrazoEntrega,
        valor: dados.Valor,
    }
}

function enderecoJsonResponse(dados) {
    return dados
}

function itemJsonResponse(item) {
    return {
        id: item._id,
        nome: item.nome
    }
}

module.exports = { freteJsonResponse, enderecoJsonResponse, itemJsonResponse }