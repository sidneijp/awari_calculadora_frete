const { CorreiosCalculador, ViaCep } = require("./models")
const { freteJsonResponse, enderecoJsonResponse } = require("./views")

async function calculadoraFrete(req, res) {
    const { cep } = req.params
    const dados = await CorreiosCalculador.calcPrecoPrazo(cep)
    const payload = freteJsonResponse(dados)
    res.json(payload)
}

async function buscaCep(req, res) {
    const { cep } = req.params
    const dados = await ViaCep.buscaEndereco(cep)
    const payload = enderecoJsonResponse(dados)
    res.json(payload)
}

module.exports = { calculadoraFrete, buscaCep }