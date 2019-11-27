const axios = require('axios')

const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao=%2711-26-2019%27&%24format=json&fbclid=IwAR3aSzsGlWFsFPKVV5rEcwLTraJTwDCaZdF-ypABIolK_88ZNKHnEdmj1fk'

axios
    .get(url)
    .then(res => console.log(res.data.value[0].cotacaoVenda))