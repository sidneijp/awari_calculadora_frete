const mongoose = require('mongoose')
const conf = require('../conf')

async function setup() {
    await mongoose.connect(conf.MONGO_CONN_URL);
}

setup().catch(err => console.log(err));

const Item = mongoose.model('Item', new mongoose.Schema({
    nome: String
}));

const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    nome: String,
    senha: String,
}));

class Items {
    static async lista() {
        return await Item.find()
    }

    static async cria(nome) {
        return await (new Item({ nome })).save()
    }

    static async obtem(id) {
        return await Item.findOne({ _id: id })
    }

    static async atualiza(item) {
        return await Item.updateOne({ _id: item._id }, { item })
    }

    static async remove(id, nome) {
        return await Item.deleteOne({ _id: id })
    }
}

class Usuarios {
    static async obtem(nome) {
        return await Usuario.findOne({ nome })
    }

    static async cria(nome, senha) {
        return await (new Usuario({ nome, senha })).save()
    }
}

module.exports = { Items, Usuarios }