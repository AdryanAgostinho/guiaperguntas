const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const connection = require("./database/database")
connection.authenticate().then(()=>{
    console.log("Conexão com o banco de dados realizada com sucesso!")
}).catch((msgErro)=>{
    console.log("Erro ao conectar com o banco de dados" + msgErro)
})


const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())

app.get("/perguntar",(req,res)=>{
var nome = req.params.nome
var empresa = req.query["empresa"]
res.render("index",{
    nome:nome,
    empresa:empresa})

})


app.get("/pergunta/:id",(req,res)=> {
   var id = req.params.id
   Pergunta.findOne({
    where: {id: id}
   }).then(pergunta => {
     if(pergunta != undefined){
        Resposta.findAll({raw: true,
            where: {perguntaId:pergunta.id},
            order:[['id','DESC']]
            }).then(respostas=>{
            console.log(pergunta.id)
            res.render("pergunta",{pergunta:pergunta,
                respostaPergunta:respostas
                
            })
        })

      
     }else{
        res.redirect("/")
     }
   })

   
})



app.get("/",(req,res)=> {
    Pergunta.findAll({raw: true,order:[
        ['id','DESC']
    ]}).then(perguntas =>{
        //console.log(perguntas)
        res.render("home",{perguntas:perguntas})
    })
  
})

app.post("/salvarpergunta",(req,res)=> {

    var nome  = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo:nome,
        descricao:descricao
    }).then(()=>{
        res.redirect("/")
    })

})

app.post("/responder",(req,res)=>{
    var id = req.body.pergunta
    var respos = req.body.corpo
    Resposta.create({
        perguntaId:id,
        corpo:respos
    }).then(()=>{
        res.redirect("/pergunta/"+id)
    })

})



app.get("/pegLog",(req,res)=>{
    Log.findAll({raw: true}).then(pergunta=>{
        res.send(pergunta)
    })
})

app.listen(8080,()=>{
    console.log("servidor rodando")
})