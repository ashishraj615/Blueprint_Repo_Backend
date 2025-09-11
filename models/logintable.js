const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  eis_no: {type: String, required: true},
  dob: {type: String, required: true}
});

module.exports = mongoose.model('logintable', loginSchema);