import express from "express"
import bodyParser from "body-parser";
import crypto from "crypto"
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) =>{
    res.sendFile(process.cwd() + '/views/index.html');
})

const users = []

app.post("/api/users", (req, res) =>{
    const {username} = req.body
    const _id = crypto.randomBytes(7).toString("hex")
    users.push({
        _id,
        username
    })
    res.json({
        username,
        _id
    })
})

app.get("/api/users", (req,res) =>{
    res.send(users)
})

const checkDate = (date) =>{
    
    if(date){
        const newDate = new Date(date)
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' }
        var formatedDate = newDate.toLocaleDateString("en-US", options)
        formatedDate = formatedDate.replaceAll(",", "")
        return formatedDate
    }
    else{
        const newDate = new Date(Date.now())
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' }
        var formatedDate = newDate.toLocaleDateString("en-US", options)
        formatedDate = formatedDate.replaceAll(",", "")
        return formatedDate
    }
}

const exercises = []

app.post("/api/users/:_id/exercises", (req,res) =>{
    const {description, duration, date} = req.body
    const {_id} = req.params
    const {username} = users.find((v)=> v._id === _id)
    const formatedDate = checkDate(date)
    const formatedDuration = +duration

    exercises.push({_id, username, description, date: formatedDate, duration: formatedDuration })
    res.json({
        username,
        description,
        duration: formatedDuration,
        date: formatedDate,
        _id,
    })

})


app.get("/api/users/:_id/logs", (req, res) =>{

    console.log(req.query)
    let from = req.query.from
    let to = req.query.to
    const limit = req.query.limit ? +(req.query.limit) : 0

    if(from) from = new Date(from)
    if (to) to = new Date(to)
    

    const {_id} = req.params
    const exercisesFinded = exercises.filter((v)=> v._id === _id)
    let newExercises = []
    exercisesFinded.map((v)=>{
        const {description, duration, date} = v

        if(from && to){
            if(new Date(date) > from && new Date(date) < to)
                newExercises.push({description, duration, date})
        }
        else{
            newExercises.push({description, duration, date})
        }
    })
    if (limit) newExercises = newExercises.slice(0,limit)
    const {username} = exercisesFinded[0]

    let obj = {
        _id,
        username,
        count: newExercises.length,
        log: newExercises
    }
    obj = {...obj, from, to}

    res.send(obj)
})



const port = 3009
app.listen(port, ()=> `Escuchando en el puerto ${port}`)