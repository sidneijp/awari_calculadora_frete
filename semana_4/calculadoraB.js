// Node.js: Core Modules - Integração com Terceiros

const http = require('http');
const https = require('https');
const { XMLParser } = require("fast-xml-parser");

const hostname = '127.0.0.1';
const port = 3000;
const CEP_ORIGEM = process.env.CEP_ORIGEM || "02987123" // "02987123" é um CEP aleatório obtido no Google pra poder testar.

const server = http.createServer((req, res) => {
    const split_path = decodeURI(req.url).split("/").filter(x => x)
    const recurso = split_path[0]
    const cep = split_path[1]
    switch (recurso) {
        case "frete":
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            calculaEntrega(cep, responseData => res.end(JSON.stringify(responseData)))
            break
        case "endereco":
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            buscaEndereco(cep, responseData => res.end(JSON.stringify(responseData)))
            break
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
    }
});

function calculaEntrega(cep_destino, callback) {
    /* 
    Doc do serviço de calc de preco e prazo:
    http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?op=CalcPrecoPrazo
    */
    const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo
    ?nCdEmpresa=
    &sDsSenha=
    &nCdServico=41106
    &sCepOrigem=${CEP_ORIGEM}
    &sCepDestino=${cep_destino}
    &nVlPeso=1
    &nCdFormato=1
    &nVlComprimento=20
    &nVlAltura=20
    &nVlLargura=20
    &nVlDiametro=0
    &sCdMaoPropria=n
    &nVlValorDeclarado=0
    &sCdAvisoRecebimento=n
    &StrRetorno=xml
    &nIndicaCalculo=3`
    http.get(url, (res) => {
        let responseData
        let rawData = ""
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            const parser = new XMLParser()
            const xmlData = parser.parse(rawData)
            const resultado = xmlData.cResultado.Servicos.cServico
            responseData = {
                prazo: resultado.PrazoEntrega,
                valor: resultado.Valor,
            }
            callback(responseData)
        });
    })
}

function buscaEndereco(cep_destino, callback) {
    /*
    Ex. de resposta:
    {
        "cep": "02987-123",
        "logradouro": "Rua Dois",
        "complemento": "",
        "bairro": "Vila Santo Antônio",
        "localidade": "São Paulo",
        "uf": "SP",
        "ibge": "3550308",
        "gia": "1004",
        "ddd": "11",
        "siafi": "7107"
    }
    */
    const url = `https://viacep.com.br/ws/${cep_destino}/json`
    https.get(url, (res) => {
        let rawData = ""
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            const responseData = JSON.parse(rawData)
            callback(responseData)
        });
    })
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
