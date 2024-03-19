const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()


app.use(bodyParser.json())
app.use(cors())



const postRoutes = require('./routes/tutorial/routesPost')
app.use (  postRoutes)

const postRoutes = require('./routes/exersice/routesPost')
app.use( postRoutes)

// //exersice
// const postRoutes = require('./routes/exersice/routesPost')
// const getRoutes = require('./routes/exersice/routesGet')
// const deleteRoutes = require('./routes/exersice/routesDelete')
// const UpdateRoutes = require('./routes/exersice/routesUpdate')
// app.use( postRoutes)
// app.use(getRoutes)
// app.use(deleteRoutes)
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




 
 

