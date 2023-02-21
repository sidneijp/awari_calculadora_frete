const express = require('express')
const controllers = require("./controllers")

const router = express.Router()

router.get("/frete/:cep/", controllers.calculadoraFrete)
router.get("/endereco/:cep/", controllers.buscaCep)

module.exports = { router }