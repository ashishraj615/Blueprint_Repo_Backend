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

exports.getComplaints = (req, res) => {
  complaints.getComplaints().then(complaintsList => {
    console.log('Fetched complaints:', complaintsList);
    res.render('../views/user/view-complaints.ejs', { complaints: complaintsList });
  }).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.getComplaintsbyID = (req, res) => {
  const { complaintId } = req.body;
  console.log('Fetching complaints by ID:', complaintId);
  complaints.getComplaintsbyID(complaintId).then(complaintsList => {
    console.log('Fetched complaints by ID:', complaintsList);
    res.render('../views/user/view-complaints.ejs', { complaints: [complaintsList] });
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
  const complaint = new complaints(location, subarea, empno, username, mobilenumber, desc, email, id);
  complaints.addComplaint(complaint).then(() => {
    console.log('Complaint filed successfully');});
  res.render('user/new-complaint.ejs',{id});
};