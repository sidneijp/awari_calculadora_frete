const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    MONGO_CONN_URL: process.env.MONGO_CONN_URL,
    CEP_ORIGEM: process.env.CEP_ORIGEM,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET
}