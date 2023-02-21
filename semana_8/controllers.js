const models = require("./models")
const views = require("./views")

async function cadastro(req, res) {
    const { nomeUsuario, senha } = req.body
    let usuario = await models.obtemUsuario(nomeUsuario)
    if (usuario) {
        res.status(400)
        return res.json({ detail: `Usuário "${nomeUsuario}" já existe.` })
    }
    usuario = await models.criaUsuario(nomeUsuario, senha)
    const payload = models.geraJwt(usuario)
    res.status(201)
    res.json(payload)
}

async function entrar(req, res) {
    const { nomeUsuario, senha } = req.body
    const usuario = await models.obtemUsuario(nomeUsuario)
    if (!usuario) {
        res.status(404)
        res.json({ detail: `Usuário "${nomeUsuario}" não existe.` })
        return
    }
    if (!models.validaSenhaUsuario(usuario, senha)) {
        res.status(400)
        res.json({ detail: `Não foi possível autenticar "${nomeUsuario}".` })
        return
    }
    const payload = models.geraJwt(usuario)
    res.status(200)
    res.json(payload)
}

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
    if (!item)
        return res.sendStatus(404)
    const payload = views.itemJsonResponse(item)
    res.status(200)
    res.json(payload)
}

async function atualizaItem(req, res) {
    const { id } = req.params
    const { nome } = req.body
    let item = await models.obtemItem(id)
    item.nome = nome
    if (!item)
        return res.sendStatus(404)
    item = await models.atualizaItem(item)
    const payload = views.itemJsonResponse(item)
    res.status(200)
    res.json(payload)
}

async function removeItem(req, res) {
    const { id } = req.params
    let item = await models.obtemItem(id)
    if (!item)
        return res.sendStatus(404)
    await models.removeItem(id)
    res.status(204)
    res.end()
}

function estaLogadoMiddleware(req, res, next) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]

    if (!token)
        return res.sendStatus(401)

    const decoded = models.validaJwt(token)
    if (!decoded)
        return res.sendStatus(401)

    models.obtemUsuario(decoded.nomeUsuario).then(function (usuario) {
        req.usuario = usuario
    })
    next()
}


module.exports = { calculadoraFrete, buscaCep, listaItems, criaItem, obtemItem, atualizaItem, removeItem, cadastro, entrar, estaLogadoMiddleware }