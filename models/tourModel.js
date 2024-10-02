const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must not exceed 40 characters '],
      minlength: [10, 'A tour name must be more than 10 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a Difficuly'],
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'Difficulty should be either: medium, easy or difficulty ',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tourSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
