// 09 Boas Práticas em Código - Versionamento, Testes, Boas Práticas, Segurança
const conf = require('./conf')
const express = require('express')
const { router } = require('./routes')
const app = express()
const port = conf.PORT

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})