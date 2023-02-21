const { CorreiosCalculador } = require("./repositories/correios")
const { ViaCep } = require("./repositories/viaCep")
const { Items, Usuarios } = require("./repositories/mongoose")
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const conf = require('./conf')

async function obtemUsuario(nomeUsuario) {
    return await Usuarios.obtem(nomeUsuario)
}

async function criaUsuario(nomeUsuario, senha) {
    const salt = crypto.randomBytes(16).toString('hex')
    const senhaCriptografada = `${salt}:${crypto.pbkdf2Sync(senha, salt, 1000, 64, 'sha512').toString('hex')}`;
    return await Usuarios.cria(nomeUsuario, senhaCriptografada)
}

async function validaSenhaUsuario(nomeUsuario, senha) {
    const usuario = await Usuarios.obtem(nomeUsuario)
    const [salt, senhaCriptografada] = usuario.senha.split(":")
    const senhaEnviadaCriptografada = crypto.pbkdf2Sync(senha, salt, 1000, 64, 'sha512').toString('hex')
    return senhaCriptografada === senhaEnviadaCriptografada
}

function geraJwt(usuario) {
    const AN_HOUR = 60 * 60
    const dados = { nomeUsuario: usuario.nome }
    const options = { expiresIn: AN_HOUR }
    const token = jwt.sign({ data: dados }, conf.SECRET, options);
    return token
}

function validaJwt(token) {
    try {
        return jwt.verify(token, conf.SECRET)
    } catch (err) {
        return null
    }
}

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

async function atualizaItem(item) {
    await Items.atualiza(item)
    return item
}

async function removeItem(id) {
    return await Items.remove(id)
}


module.exports = {
    calculaFrete, buscaCep, listaItems, criaItem, obtemItem, atualizaItem, removeItem, criaUsuario, obtemUsuario, validaSenhaUsuario, geraJwt, validaJwt
}