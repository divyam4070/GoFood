const express = require('express')
const app = express()
const port = 5000
require('dotenv').config();
const cors = require('cors')
const mongoDB = require("./db")

mongoDB()
app.use(cors({
  origin: '*'
}));

// CORS middleware - improved
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

    if (req.method === "OPTIONS") {
        // Respond OK to OPTIONS requests (preflight)
        return res.sendStatus(200)
    }
    next()
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api/auth', require("./Routes/OrderData"))

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
