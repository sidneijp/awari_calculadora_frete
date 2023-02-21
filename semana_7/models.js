const { CorreiosCalculador } = require("./repositories/correios")
const { ViaCep } = require("./repositories/viaCep")
const { Items } = require("./repositories/mongoose")

async function calculaFrete(cep) {
    return await CorreiosCalculador.calcPrecoPrazo(cep)
}

async function buscaCep(cep) {
    return await ViaCep.buscaEndereco(cep)
}

async function listaItems() {
    return await Items.lista()
}

async function criaItem(nome) {
    return await Items.cria(nome)
}

async function obtemItem(id) {
    return await Items.obtem(id)
}

async function atualizaItem(id, nome) {
    return await Items.atualiza(id, nome)
}

async function removeItem(id) {
    return await Items.remove(id)
}


module.exports = {
    calculaFrete, buscaCep, listaItems, criaItem, obtemItem, atualizaItem, removeItem
}