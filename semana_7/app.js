// 08 APIs - CRUD de Item
const express = require('express')
const { router } = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})