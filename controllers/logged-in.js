const complaints = require('../models/complaints');

exports.getLogin = (req, res) => {
  const eis = 90385287;
  const password = '2025-08-07';
  const { username, password: userPassword, empno } = req.body;
  if (username == eis && userPassword == password) {
    console.log('Login successful', { username, empno });
    res.render('user/new-complaint.ejs', { empno });
  } else {
    console.log('Login failed');
    res.render('user/login-page.ejs');
  }
};

exports.fileComplaint = (req, res) => {
  const { location, subarea, empno, username, mobilenumber, desc, email } = req.body;
  const complaint = new complaints(location, subarea, empno, username, mobilenumber, desc, email);
  complaints.addComplaint(complaint);
  console.log('Complaint filed:');
  res.render('user/new-complaint.ejs',{empno});
};