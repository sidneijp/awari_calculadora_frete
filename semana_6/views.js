function freteJsonResponse(dados) {
    return {
        prazo: dados.PrazoEntrega,
        valor: dados.Valor,
    }
}

function enderecoJsonResponse(dados) {
    return dados
}

module.exports = { freteJsonResponse, enderecoJsonResponse }