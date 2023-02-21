const models = require("./models")
const { freteJsonResponse, enderecoJsonResponse } = require("./views")

async function calculadoraFrete(req, res) {
    const { cep } = req.params
    const dados = await models.calculaFrete(cep)
    const payload = freteJsonResponse(dados)
    res.json(payload)
}

async function buscaCep(req, res) {
    const { cep } = req.params
    const dados = await models.buscaCep(cep)
    const payload = enderecoJsonResponse(dados)
    res.json(payload)
}

async function listaItems(req, res) {
    const payload = await models.listaItems()
    res.json(payload)
}

async function criaItem(req, res) {
    const { nome } = req.body
    const payload = await models.criaItem(nome)
    res.json(payload)
}

module.exports = { calculadoraFrete, buscaCep, listaItems, criaItem }