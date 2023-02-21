const express = require('express')
const controllers = require("./controllers")

const router = express.Router()

router.get("/frete/:cep/", controllers.calculadoraFrete)
router.get("/endereco/:cep/", controllers.buscaCep)

router.get("/items/", controllers.listaItems)
router.post("/items/", controllers.criaItem)

module.exports = { router }