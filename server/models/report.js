const mongoose = require('mongoose');
const validator = require('validator');


var Report = mongoose.model('Report', {
  img_url: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
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
    primary: {
      type: Number,
      required: true
    },
    secondary: {
      type: Number,
      required: false
    }
  }],
  material: [{
    primary: {
      type: String,
      required: true
    },
    secondary: {
      type: String,
      required: false
    }
  }]
});

module.exports = {Report}
