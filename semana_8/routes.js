// arquivos de rotas principal
const express = require('express')
const controllers = require("./controllers")

const router = express.Router()

router.post("/autenticacao/cadastro/", controllers.cadastro)
router.post("/autenticacao/entrar/", controllers.entrar)

router.use("/frete/", controllers.estaLogadoMiddleware)
router.use("/endereco/", controllers.estaLogadoMiddleware)
router.get("/frete/:cep/", controllers.calculadoraFrete)
router.get("/endereco/:cep/", controllers.buscaCep)

router.use("/items/", controllers.estaLogadoMiddleware)
router.get("/items/", controllers.listaItems)
router.post("/items/", controllers.criaItem)
router.get("/items/:id/", controllers.obtemItem)
router.put("/items/:id/", controllers.atualizaItem)
router.delete("/items/:id/", controllers.removeItem)

module.exports = { router }