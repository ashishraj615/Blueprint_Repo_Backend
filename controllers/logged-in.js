const complaints = require('../models/complaints');
const logintable = require('../models/logintable');
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.getLogin = [
  check('username').trim().isNumeric()
  .withMessage('EIS must be numeric')
  .isLength({ min: 4, max: 8 })
  .withMessage('EIS must be at max 8 digits long')
  ,
  
  (req, res) => {
    const errors = validationResult(req);
    logintable.findOne({ eis_no: req.body.username}).then(user => {
    if (errors.isEmpty()) {
      const username = req.body.username;
      const userPassword = req.body.password;
      if (username === user.eis_no && userPassword === user.dob) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        const jwttoken = jwt.sign({username: user.eis_no},
          process.env.JWT_SECRET,
          {expiresIn: '10m'}
        )
        res.status(201).json({ jwttoken, status: true });
      } else {
        req.session.isLoggedIn = false;
        res.status(201).json({ username, status: false })
      }
    }
    else{
      res.status(422).json({ username, status: false })
    }
  });
    
  }
];

exports.getComplaints = (req, res) => {
  complaints.find({ filedby: req.query.filedby}).then(complaintsList => {
    console.log('session:', req.session.isLoggedIn,  typeof(req.query.filedby));
    console.log("jwt user: ", req.user)
    res.status(201).json({ complaints: complaintsList, isLoggedIn: req.session.isLoggedIn });
  }).catch(err => {
    console.error('Error fetching complaints:', err);
    res.status(500).send('Internal Server Error');
  });
};

exports.getComplaintsbyID = (req, res) => {
  const complaintId  = req.body.value;
  console.log("complaint id receivd: ",complaintId.length, req.query);
  if(complaintId.length=='12'){
    console.log("hello")
    complaints.findOne({ id: complaintId}).then(complaint => {
    if (!complaint) { // ID not found
      res.status(201).json({ complaints: [], isLoggedIn: req.session.isLoggedIn, notFound: true });
    } else {// ID found
      res.status(201).json({ complaints: [complaint], isLoggedIn: req.session.isLoggedIn });
    }
  }).catch(err => {
      console.error('Error fetching complaints:', err);
      res.status(500).send('Internal Server Error');
    });
  }
  else{
    complaints.findOne({ serialno: complaintId}).then(complaint => {
    if (!complaint) { // ID not found
      res.status(201).json({ complaints: [], isLoggedIn: req.session.isLoggedIn, notFound: true });
    } else {// ID found
      res.status(201).json({ complaints: [complaint], isLoggedIn: req.session.isLoggedIn });
    }
  }).catch(err => {
      console.error('Error fetching complaints:', err);
      res.status(500).send('Internal Server Error');
    });
  }
};

exports.fileComplaint = (req, res) => {
  const { location, subarea, component1, component2, component3, component4, component5, serialno, empno, username, mobilenumber, desc, email, filedby } = req.body;
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  const id = `${datePart}${randomPart}`;
  const complaint = new complaints({location, subarea, component1, component2, component3, component4, component5, serialno, empno, username, mobilenumber, desc, email, id,filedby});
  complaint.save().then(() => {
    console.log('Complaint filed successfully');});
  res.status(201).json({id, isLoggedIn: req.session.isLoggedIn})
};