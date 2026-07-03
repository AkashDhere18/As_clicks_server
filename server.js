require('dotenv').config()

const express = require('express')

const cors = require('cors')
const port = process.env.PORT || 5003
const app = express()

app.use(express.json())

app.use(
    cors({
        origin:[
            "http://localhost:5173",
            process.env.FRONTEND_URL,
        
        ],
    })
)

app.use('/api/gallery', require("./Routes/galleryRoutes"));

app.use('/api/contact', require("./Routes/contactRoute"));

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})