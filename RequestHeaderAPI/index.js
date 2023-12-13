import express from "express"

const app = express()

app.get("/whoami", (req, res) =>{
    console.log(req.rawHeaders)
    const language = req.rawHeaders[29]
    const software = req.rawHeaders[15]
    const ipaddress = req.ip.replaceAll(":","").replace("ffff", "")
    res.json({
        ipaddress,
        language,
        software
    })
})



const port = 3009
app.listen(port,()=> `Estás escuchando el puerto ${port}`)