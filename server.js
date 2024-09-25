const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')

const app = express()

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {}).then(() => console.log('DB connected Sucessfull'))

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}...`)
})
