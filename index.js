const express = require('express');
const connection = require('./database/database');
const app = express()

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController')

//=======IMPORATNDO MODELS========
const Article = require('./articles/Article');
const Category = require('./categories/Category');

//===========view engine==========
app.set('view engine','ejs')

//========static files==============
app.use(express.static('public'))

//========json files=================
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


//=========connection database========
connection
.authenticate()
    .then( ()=>{
        console.log('conexao feita com sucesso')
    }).catch((error)=>{
           console.log(error)
    })


    //=======ACESSANDO ROTAS===============
    app.use("/", categoriesController)
    app.use('/', articlesController)


//============iniciando rotas===============
app.get('/', (req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles =>{
        Category.findAll().then( categories =>{
            res.render('index', {articles: articles, categories:categories})
        })
    })
}) 



app.get('/:slug', (req,res)=>{
    var slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then( article =>{
        if(article != undefined){
            Category.findAll().then( categories =>{
                res.render('article', {article: article, categories:categories})
            })      
          }else{
            res.redirect('/')
        }
    }).catch( err=>{
        res.redirect("/")
    })

})


app.get('/category/:slug', (req,res)=>{
    var  slug = req.params.slug
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model: Article}]
    }).then( category =>{
        if(category != undefined){
        findAll().then(categories =>{
            res.render("index", {articles: category.articles, categories: categories})
        })

        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect('/')
        
    })
})
//========connection port=============
app.listen(1337, ()=>{
    console.log('servidor em execuçao👌🖥')
})