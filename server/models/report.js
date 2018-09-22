const mongoose = require('mongoose');
const validator = require('validator');


var Report = mongoose.model('Report', {
  img_url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: false,  //  image ids are unique???
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid URL'
    }
  },
  color: {
    type: String,
    require: true,
    minlength: 3
  },
  size: {
    type: Number,
    require: true,
    minlength: 3
  },  
  geolocation: [{
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    }
  }],
  material: {
    type: Number,
    require: true,
    minlength: 3
  }
});

module.exports = {Report}
