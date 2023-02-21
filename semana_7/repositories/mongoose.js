const mongoose = require('mongoose');

async function setup() {
    await mongoose.connect('mongodb://127.0.0.1:27017/produtos');
}

setup().catch(err => console.log(err));

const Item = mongoose.model('Item', new mongoose.Schema({
    nome: String
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

    static async atualiza(id, nome) {
        return await Item.updateOne({ _id: id }, { nome })
    }

    static async remove(id, nome) {
        return await Item.deleteOne({ _id: id })
    }
}

module.exports = { Items }