const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')

const port =process.env.PORT || 3000    


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    // console.log(req) para ver onde está vindo a cotação e a quantidade: vem na query
    // console.log(req.query) descobre o que vem na query para poder saber o que vai extrair
    const {cotacao, quantidade} = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', { // isso é a pagia com a resposta para essa conta e, baixo o que vai mostrar
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        }) 
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos'
        })
    }
})

app.listen(port, err => {
    if(err) {
        console.log('Não foi possivel iniciar')
    } else {
        console.log('ConvertMyMoney está Online')
    }
})
