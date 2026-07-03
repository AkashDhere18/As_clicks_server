require('dotenv').config()

const express = require('express')

const cors = require('cors')
const port = process.env.PORT || 5003
const app = express()

app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  "https://as-clicks.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use('/api/gallery', require("./Routes/galleryRoutes"));

app.use('/api/contact', require("./Routes/contactRoute"));

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})