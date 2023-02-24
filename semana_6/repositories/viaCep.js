const { default: axios } = require("axios")

class ViaCep {
    static urlBase = `https://viacep.com.br/ws`

    static async buscaEndereco(cep_destino) {
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
        const url = `${this.urlBase}/${cep_destino}/json`
        let response
        try {
            response = await axios.get(url)
        } catch (error) {
            console.error(error);
            return {}
        }
        return response.data
    }
}


module.exports = { ViaCep }