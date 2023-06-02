//config inicial
const express = require('express') 
const mongoose = require('mongoose')
const app = express()


// forma de ler json | middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Rotas da API
const ratingRoutes = require('./routes/ratingRoutes')

app.use('/rating', ratingRoutes)

//rota inicial | endpoint
app.get('/', (req, res) => {
    
    //mostrar req
    res.json({massage: 'oi express' })

})

//Gi2dVSx8kh5Rc5J6

const URL = 'mongodb+srv://gabrielccavalheiro:Gi2dVSx8kh5Rc5J6@apicluster.wzft5gi.mongodb.net/?retryWrites=true&w=majority'
//entregar uma porta

mongoose
.connect(
    URL
)
.then(()=>{
    console.log("Conectamos ao MongoDB")
})
.catch((err) => console.log(err))

app.listen(3000)
