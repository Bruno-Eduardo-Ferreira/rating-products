const router = require('express').Router()

const Rating = require('../models/Rating')

//Adicionando a avaliação no MongoDB
router.post('/', async (req, res) =>{

    const {idPessoa, idProduto, rate} = req.body

    const rating = {
        idPessoa,
        idProduto,
        rate
    }

    //Localiza se a pessoa ja avaliou o produto.
    const unico = await Rating.find({idPessoa:rating.idPessoa, idProduto:rating.idProduto})
    
    //Testa se o produto já foi avaliado 
    if(unico.length<=0){
        try {
            // criando dados 
            await Rating.create(rating)
            res.status(201).json({ message: 'Avaliação guardada no sistema'})
    
        } catch (error) {
            res.status(500).json({error: error})
        }
    }else{
    res.status(400).json({ message: 'Produto ja avaliado'})
    }
})

//Pesquisa de avaliação todos os produto 
router.get('/', async (req, res) =>{

    try {
        const produtos = await Rating.find()

        res.status(200).json(produtos)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Pesquisa de avaliação por produto 
router.get('/:id', async (req, res) =>{

    //extrair dados da requisição pela url = req.params
    //id aqui é o ID do produto 
    const id = req.params.id

    try {
        const produto = await Rating.find({idProduto: id})
        if (!produto) {
            res.status(424).json({message: 'Produto não encontrado'})
            return
        }
        res.status(200).json(produto)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Busca media do produto 
router.get('/media/:id', async (req, res) =>{

    const id = req.params.id

    try {

        const produto = await Rating.find({idProduto: id})
        var sum=0;
        
        if (!produto) {
            res.status(424).json({message: 'Produto não encontrado'})
            return
        }
        
        for (let i = 0; i < produto.length; i++) {
            const j = produto[i].rate;
            sum = sum + j;
        }
    
        const media = sum / (produto).length

        res.status(200).json(media)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

//update - Atualizar as avaliações no banco (PATCH)
router.patch('/:id', async(req, res) => {
    
    //id aqui é o ID da avaliação
    const id = req.params.id

    const {idPessoa, idProduto, rate} = req.body
    
    const rating = {
        idPessoa,
        idProduto,
        rate
    }
    
    try {
        
        const updatedRating = await Rating.updateOne({_id: id}, rating)
        
        //Verifica se a avlição foi atualizada 
        if(updatedRating.matchedCount === 0){
            res.status(424).json({message: 'Avaliação não encontrada'})
            return
        }
        console.log(id)
        res.status(200).json(rating)     

    } catch (error) {
        res.status(500).json({message: 'Avaliação'}) //error: error
    }

})


module.exports = router