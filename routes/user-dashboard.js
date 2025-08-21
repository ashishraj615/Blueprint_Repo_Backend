const express = require('express');
const userDashboardRouter = express.Router();


const eis = 90385287;
const password = '2025-08-07';

userDashboardRouter.get('/', (req, res) => {
  res.render('user-dashboard.ejs');
});


userDashboardRouter.post('/file-complaint', (req, res) => {
  console.log(req.body);
  const { location, empno, desc, email } = req.body;
  console.log('Complaint filed:', { location, empno, desc, email });
  res.render('new-complaint.ejs',{empno});
});

userDashboardRouter.get('/login-page', (req, res) => {
  res.render('login-page.ejs');
});

userDashboardRouter.post('/login', (req, res) => {
  const { username, password: userPassword, empno } = req.body;
  if (username == eis && userPassword == password) {
    console.log('Login successful', { username, empno });
    res.render('new-complaint.ejs', { empno });
  } else {
    console.log('Login failed');
    res.render('login-page.ejs');
  }
});

module.exports = userDashboardRouter;