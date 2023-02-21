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

function calcularFrete(cidade, sigla) {
    const regiao = TABELA_PRECOS.find(item => item.estados.flatMap(x => x.sigla).includes(sigla));
    const _estado = regiao.estados.find(item => item.sigla == sigla)
    const valor = _estado.valor || regiao.valor
    return valor
}

function compareByKey(a, b, key) {
    if (a[key] > b[key])
        return 1
    if (b[key] > a[key])
        return - 1
    return 0
}


const cidade = "tanto faz"
const reaisFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, style: "currency", currency: "BRL", })
for (const regiao of TABELA_PRECOS) {
    console.log("# Região")
    const estados = regiao.estados
    estados.sort((a, b) => compareByKey(a, b, "sigla"))
    for (const estado of estados) {
        const valor = calcularFrete(cidade, estado.sigla)
        console.log(`- Frete p/ ${estado.sigla} é de ${reaisFormatter.format(valor)}`)
    }
    console.log("\n")
}