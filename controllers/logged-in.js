const complaints = require('../models/complaints');

exports.getLogin = (req, res) => {
  const eis = 90385287;
  const password = '2025-08-07';
  const { username, password: userPassword, empno } = req.body;
  if (username == eis && userPassword == password) {
    console.log('Login successful', { username, empno });
    req.session.isLoggedIn = true;
    res.render('user/new-complaint.ejs', { isLoggedIn: req.session.isLoggedIn, empno });
  } else {
    console.log('Login failed');
    req.session.isLoggedIn = false;
    res.render('user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn});
  }
};

exports.getComplaints = (req, res) => {
  complaints.find().then(complaintsList => {
    console.log('Fetched complaints:', complaintsList);
    if(req.session.isLoggedIn)
      res.render('../views/user/view-complaints.ejs', { complaints: complaintsList, isLoggedIn: req.session.isLoggedIn });
    else
      res.render('../views/user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn});
  }).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.getComplaintsbyID = (req, res) => {
  const { complaintId } = req.body;
  console.log('Fetching complaints by ID:', complaintId);
  complaints.findOne({ id: complaintId}).then(complaintsList => {
    console.log('Fetched complaints by ID:', complaintsList);
    res.render('../views/user/view-complaints.ejs', { complaints: [complaintsList] ,  isLoggedIn: req.session.isLoggedIn});
  }).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.fileComplaint = (req, res) => {
  const { location, subarea, empno, username, mobilenumber, desc, email } = req.body;
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  const id = `${datePart}${randomPart}`;
  const complaint = new complaints({location, subarea, empno, username, mobilenumber, desc, email, id});
  complaint.save().then(() => {
    console.log('Complaint filed successfully');});
  res.render('user/new-complaint.ejs',{id, isLoggedIn: req.session.isLoggedIn});
};