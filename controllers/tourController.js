const Tour = require('./../models/tourModel')

exports.createTour = async (req, res) => {
  try {
    let { name, difficulty, slug } = req.body
    const newTour = await Tour.create({ name, difficulty, slug })

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}
