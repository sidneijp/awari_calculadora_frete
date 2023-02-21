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
}

module.exports = { Items }