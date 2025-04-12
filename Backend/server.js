const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db/db')
const cookieParser =require('cookie-parser')
const cors = require('cors')

const scpRoute = require('./router/scpRoute')
const farmerRoute = require('./router/farmerRoute')

db()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/scp', scpRoute)
app.use('/farmer', farmerRoute)
app.get("/", (req, res) => {
    res.send("SCP Manager API")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})