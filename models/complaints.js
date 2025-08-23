const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  location: {type: String, required: true},
  subarea: {type: String, required: true},
  empno: {type: Number, required: true},
  username: {type: String, required: true},
  mobilenumber: {type: Number, required: true},
  desc: {type: String},
  email: {type: String},
  id: {type: Number, required: true, unique: true}
});

module.exports = mongoose.model('Complaints', complaintsSchema);