const mongoose = require('mongoose');
const { Schema } = mongoose;

const registrationSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  email: String,
  registerDate: Date
});

mongoose.model('registration', registrationSchema);