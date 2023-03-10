// 04 Node.js: Fundamentos - Melhorando os Cálculos

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

function comparaPorProp(a, b, prop) {
    if (a[prop] > b[prop])
        return 1
    if (b[prop] > a[prop])
        return - 1
    return 0
}


const cidade = "qualquer outra cidade"
const reaisFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, style: "currency", currency: "BRL", })
for (const regiao of TABELA_PRECOS) {
    console.log(`# Região ${regiao.regiao}`)
    const estados = regiao.estados
    estados.sort((a, b) => comparaPorProp(a, b, "sigla"))
    for (const estado of estados) {
        const valor = calculaFrete(cidade, estado.sigla)
        console.log(`- Frete p/ ${estado.sigla} é de ${reaisFormatter.format(valor)}`)
    }
    console.log("\n")
}