import express from "express"
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use("/paja", express.static(__dirname + "/public"))

app.get("/", (req,res,next) => {
    res.sendFile(__dirname + "/routes/index.html")
})

const utcDate = (date, dateGMT) => {
    dateGMT == "Invalid Date" && (dateGMT = new Date(+date))
    return dateGMT.toUTCString()
}

const unixDate = (date, dateGMT) => {
    dateGMT == "Invalid Date" && (dateGMT = new Date(+date))
    return dateGMT.getTime()
}

app.get("/api", (req, res) => {
    const today = new Date(Date.now())
    res.json({
        unix: today.getTime(),
        utc: today.toUTCString()
    })
})

app.get("/api/:date", (req, res) =>{
    const {date} = req.params
    const dateGMT = new Date(date)
    const unix = unixDate(date, dateGMT)
    const utc = utcDate(date, dateGMT)
    if(unix){
        res.json({
            unix,
            utc
        })
    }
    else res.json({
        error: "Invalid Date"
    })
})

const port = 3009;

app.listen(port, ()=> `Escuchando en el puerto ${port}`)