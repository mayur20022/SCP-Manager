const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db/db')
const cookieParser =require('cookie-parser')
const cors = require('cors')

const scpRoute = require('./router/scpRoute')
const farmerRoute = require('./router/farmerRoute')

db()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/scp', scpRoute)
app.use('/farmer', farmerRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})