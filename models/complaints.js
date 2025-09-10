const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
  location: {type: String, required: true},
  subarea: {type: String, required: true},
  component1: {type: String},
  component2: {type: String},
  component3: {type: String},
  component4: {type: String},
  component5: {type: String},
  serialno: {type: String, required: true},
  empno: {type: Number, required: true},
  username: {type: String, required: true},
  mobilenumber: {type: Number, required: true},
  desc: {type: String},
  email: {type: String},
  id: {type: Number, required: true, unique: true},
  filedby: {type: String, required: true}
});

module.exports = mongoose.model('Complaints', complaintsSchema);