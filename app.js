const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const tourRouter = require('./routes/tourRoutes')

const app = express()

const morgan = require('morgan')
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {}).then(() => console.log('DB connected Sucessfull'))

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tourRouter)

module.exports = app
