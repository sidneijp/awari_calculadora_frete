// 05 Node.js: Core Modules - Construção da API

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const [rota, query_string] = decodeURI(req.url).split("?")
    const query_params = query_string ? query_string.split("&") : []
    const params = {}
    for (const query_param of query_params) {
        const [prop, valor] = query_param.split("=")
        params[prop] = valor
    }
    if (req.method == "GET" && rota == "/frete/") {
        const { cidade, estado } = params
        if (!estado) {
            res.statusCode = 400; // Bad request
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ detail: 'Parâmetro "estado" é obrigatório.' }))
        }
        const valor = calculaFrete(cidade, estado)
        const payload = { valor }
        res.statusCode = 200; // Ok
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(payload))
    } else {
        res.statusCode = 404;  // Not Found
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

const TABELA_PRECOS = [
    {
        regiao: "Sul",
        valor: 10,
        estados: [
            { sigla: "PR", valor: 8 },
            { sigla: "SC" },
            { sigla: "RS" },
        ],
    },
    {
        regiao: "Sudeste",
        valor: 8,
        estados: [
            { sigla: "SP", valor: 5 },
            { sigla: "RJ", valor: 6.5 },
            { sigla: "MG", valor: 7.2 },
            { sigla: "ES" },
        ],
    },
    {
        regiao: "Centro Oeste",
        valor: 11.5,
        estados: [
            { sigla: "GO" },
            { sigla: "MS" },
            { sigla: "MT" },
            { sigla: "DF" },
        ],
    },
    {
        regiao: "Norte",
        valor: 20,
        estados: [
            { sigla: "AM", valor: 23.5 },
            { sigla: "AC", valor: 23.5 },
            { sigla: "RO", valor: 22 },
            { sigla: "RR", valor: 22 },
            { sigla: "PA" },
            { sigla: "AP" },
            { sigla: "TO" },
        ],
    },
    {
        regiao: "Nordeste",
        valor: 15,
        estados: [
            { sigla: "MA" },
            { sigla: "PI" },
            { sigla: "CE" },
            { sigla: "RN" },
            { sigla: "PB" },
            { sigla: "PE" },
            { sigla: "AL" },
            { sigla: "SE" },
            { sigla: "BA" },
        ],
    },
]

function calculaFrete(cidade, sigla_estado) {
    if (cidade == "São Paulo" && sigla_estado == "SP")
        return 0
    const regiao = TABELA_PRECOS.find(item => item.estados.flatMap(x => x.sigla).includes(sigla_estado));
    const _estado = regiao.estados.find(item => item.sigla == sigla_estado)
    const valor = _estado.valor || regiao.valor
    return valor
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
