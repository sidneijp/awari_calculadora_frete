const { default: axios } = require("axios")
const { XMLParser } = require("fast-xml-parser");
const conf = require('../conf')

class CorreiosCalculador {
    static urlBase = 'http://ws.correios.com.br/calculador'

    static async calcPrecoPrazo(cep_destino) {
        const params = {
            nCdEmpresa: "",
            sDsSenha: "",
            nCdServico: 41106,
            sCepOrigem: conf.CEP_ORIGEM,
            sCepDestino: cep_destino,
            nVlPeso: 1,
            nCdFormato: 1,
            nVlComprimento: 20,
            nVlAltura: 20,
            nVlLargura: 20,
            nVlDiametro: 0,
            sCdMaoPropria: "n",
            nVlValorDeclarado: 0,
            sCdAvisoRecebimento: "n",
            StrRetorno: "xml",
            nIndicaCalculo: 3,
        }
        const query_params = new URLSearchParams(params)
        const url = `${this.urlBase}/CalcPrecoPrazo.asmx/CalcPrecoPrazo`
        let response
        try {
            response = await axios.get(url, { params: query_params })
        } catch (error) {
            console.error(error);
        }
        const parser = new XMLParser()
        const xmlData = parser.parse(response.data)
        const resultado = xmlData.cResultado.Servicos.cServico
        return resultado
    }
}

module.exports = { CorreiosCalculador }