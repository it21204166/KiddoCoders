const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')



const app = express()


app.use(bodyParser.json())
app.use(cors())

const QuesRouter = require("./routes/tutorial/QuestionRoute")
app.use("/ques", QuesRouter)

const FeedRouter = require("./routes/tutorial/FeedbackRoute")
app.use("/feed", FeedRouter)

const TuteRouter = require("./routes/tutorial/TutbegRoute")
app.use("/tute", TuteRouter)

const Tute2Router = require("./routes/tutorial/TutintRoute")
app.use("/tute2", Tute2Router)








const postRoutes = require('./routes/exersice/routesPost')
app.use( postRoutes)

// //exersice
const postRoutes = require('./routes/exersice/routesPost')
const getRoutes = require('./routes/exersice/routesGet')
const deleteRoutes = require('./routes/exersice/routesDelete')
// const UpdateRoutes = require('./routes/exersice/routesUpdate')
app.use( postRoutes)
app.use(getRoutes)
app.use(deleteRoutes)
// app.use(UpdateRoutes)

const PORT = 8000
const DB_URL = "mongodb+srv://kiddocoders:kiddo@kiddocoders.f9z2yae.mongodb.net/?retryWrites=true&w=majority&appName=KiddoCoders"


mongoose.connect(DB_URL).then(() => {
    console.log('Database was connected')
}).catch((err) => {
    console.log('Database was not connected, Error orccured')
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
})




 
 

