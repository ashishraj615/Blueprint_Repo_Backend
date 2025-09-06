const complaints = require('../models/complaints');
const { check, validationResult } = require("express-validator");

exports.getLogin = [
  check('username')
  .trim()
  .isNumeric()
  .withMessage('EIS must be numeric')
  .isLength({ min: 4, max: 8 })
  .withMessage('EIS must be at max 8 digits long')
  ,
  
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const eis = '90385287'; const password = '2025-08-07';
      const username = req.body.username;
      const userPassword = req.body.password;
      if (username === eis && userPassword === password) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        res.status(201).json({ username, status: true });
      } else {
        req.session.isLoggedIn = false;
        res.status(201).json({ username, status: false })
      }
    }
    else{
      res.status(422).json({ username, status: false })
    }
  }
];

exports.getComplaints = (req, res) => {
  complaints.find().then(complaintsList => {
    console.log('Fetched complaints:', complaintsList);
    if(req.session.isLoggedIn)
      res.render('../views/user/view-complaints.ejs', { complaints: complaintsList, isLoggedIn: req.session.isLoggedIn });
    else
      res.render('../views/user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn, validationErrors: []});
  }).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.getComplaintsbyID = (req, res) => {
  const { complaintId } = req.body;
  complaints.findOne({ id: complaintId}).then(complaint => {
  if (!complaint) { // ID not found
    res.render('../views/user/view-complaints.ejs', { complaints: [], isLoggedIn: req.session.isLoggedIn, notFound: true });
  } else {// ID found
    res.render('../views/user/view-complaints.ejs', { complaints: [complaint], isLoggedIn: req.session.isLoggedIn });
  }
}).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.fileComplaint = (req, res) => {
  const { location, subarea, component1, component2, component3, component4, component5, serialno, empno, username, mobilenumber, desc, email } = req.body;
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  const id = `${datePart}${randomPart}`;
  const complaint = new complaints({location, subarea, component1, component2, component3, component4, component5, serialno, empno, username, mobilenumber, desc, email, id});
  complaint.save().then(() => {
    console.log('Complaint filed successfully');});
  res.status(201).json({id, isLoggedIn: req.session.isLoggedIn})
};