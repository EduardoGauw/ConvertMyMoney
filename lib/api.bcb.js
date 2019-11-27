const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%27${data}%27&%24format=json&fbclid=IwAR3aSzsGlWFsFPKVV5rEcwLTraJTwDCaZdF-ypABIolK_88ZNKHnEdmj1fk`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
}
const getCotacao = async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(today) // '11-26-2019'
        const cotacao = extractCotacao(res)
        return cotacao
        } catch(err){
            return ''
        }
}

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao
}