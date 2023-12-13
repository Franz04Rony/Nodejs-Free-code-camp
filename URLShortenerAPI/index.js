import express from "express"
import bodyParser from "body-parser";
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())
 
app.get("/", (req, res)=>{
    res.sendFile(process.cwd() + '/views/index.html');
})

const isURL = (url) =>{
    const pattern = new RegExp('https:\/\/', 'g')
    return pattern.test(url)
}

const urls = []

app.post("/api/shorturl", (req, res)=>{

    const {url} = req.body
    if(isURL(url)){
        if (!urls.find((e)=> e === url)) urls.push(url)
        console.log(urls)
        res.json({
            original_url: url,
            short_url: urls.findIndex((e)=> e === url)
        })
    }
    else{
        res.json({
            error: 'invalid url'
        })
    }
    
})

app.get("/api/shorturl/:id", (req, res)=>{
    const {id} = req.params
    res.redirect(urls[id])
})

const port = 3009
app.listen(port, ()=>{
    `Escuchando el puerto ${port}`
})