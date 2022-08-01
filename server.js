const mongoose = require('mongoose')
const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const apiRoutes = require('./routes/api')

app.use('/api', apiRoutes)
mongoose.connect('mongodb://localhost:27017/socialNetworkApi')
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`connected on localhost:${PORT}`))