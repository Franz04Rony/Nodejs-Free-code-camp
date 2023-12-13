import express from "express"
import multer from "multer"
const upload = multer({dest: 'uploads/'})

const app = express()


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
    const {originalname, mimetype, size} = req.file
    res.json({
        name: originalname,
        type: mimetype,
        size
    })
})


const port = 3009
app.listen(port, ()=> `escuchando en ${port}`)