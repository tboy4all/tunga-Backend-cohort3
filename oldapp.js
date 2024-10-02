const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`)
)

// app.get('/', (req, res) => {
//   //   res.status(200).send('Hello from server side')
//   res.status(200).json({ message: 'Hello from server side', app: 'tunga' })
// })

// Getting all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    results: tours.length,
    status: 'success',
    data: {
      tours,
    },
  })
})

// Create a new tour
app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body)
  //   res.send('Done')

  const newId = tours[tours.length - 1].id + 1

  const newTour = Object.assign({ id: newId }, req.body)

  tours.push(newTour)

  fs.writeFile(
    `${__dirname}/dev-data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
})

// Getting a tour
app.get('/api/v1/tours/:id', (req, res) => {
  //   console.log('Parameters', req.params)
  const id = req.params.id * 1
  //   console.log('id', id)
  if (id > tours.length) {
    return res.status(404).json({ status: 'Not Found', message: 'Invalid ID' })
  }

  const tour = tours.find((el) => el.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

// Delete A TOUR
app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1

  if (id > tours.length) {
    return res.status(404).json({ status: 'Fail', message: 'Invalid ID' })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

const port = 4000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
