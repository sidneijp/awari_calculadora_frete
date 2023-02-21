const models = require("./models")
const views = require("./views")

async function calculadoraFrete(req, res) {
    const { cep } = req.params
    const dados = await models.calculaFrete(cep)
    const payload = views.freteJsonResponse(dados)
    res.status(200)
    res.json(payload)
}

async function buscaCep(req, res) {
    const { cep } = req.params
    const dados = await models.buscaCep(cep)
    const payload = views.enderecoJsonResponse(dados)
    res.status(200)
    res.json(payload)
}

async function listaItems(req, res) {
    const items = await models.listaItems()
    const payload = items.map(i => views.itemJsonResponse(i))
    res.status(200)
    res.json(payload)
}

async function criaItem(req, res) {
    const { nome } = req.body
    const item = await models.criaItem(nome)
    const payload = views.itemJsonResponse(item)
    res.status(201)
    res.json(payload)
}

async function obtemItem(req, res) {
    const { id } = req.params
    const item = await models.obtemItem(id)
    const payload = views.itemJsonResponse(item)
    res.status(200)
    res.json(payload)
}

async function atualizaItem(req, res) {
    const { id } = req.params
    const { nome } = req.body
    const result = await models.atualizaItem(id, nome)
    const item = await models.obtemItem(id)
    const payload = views.itemJsonResponse(item)
    res.status(200)
    res.json(payload)
}

async function removeItem(req, res) {
    const { id } = req.params
    const result = await models.removeItem(id)
    res.status(204)
    res.end()
}


module.exports = { calculadoraFrete, buscaCep, listaItems, criaItem, obtemItem, atualizaItem, removeItem }