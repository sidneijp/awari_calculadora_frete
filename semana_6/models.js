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

module.exports = { calculaFrete, buscaCep, listaItems, criaItem }