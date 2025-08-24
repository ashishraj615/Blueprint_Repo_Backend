const express = require('express');
const userDashboardRouter = express.Router();
const loggedInController = require('../controllers/logged-in');


userDashboardRouter.get('/', (req, res) => {
  res.render('user/user-dashboard.ejs',{ isLoggedIn: req.session.isLoggedIn});
});

userDashboardRouter.get('/login-page', (req, res) => {
  res.render('user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn, validationErrors: []});
});

userDashboardRouter.post('/login', loggedInController.getLogin);

userDashboardRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('login-page') // Redirect to login page after logout
  });
});

userDashboardRouter.get('/file-complaint',(req, res) => { 
  if(req.session.isLoggedIn)
    res.render('user/new-complaint.ejs', { isLoggedIn: req.session.isLoggedIn});
  else
    res.render('user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn, validationErrors: []});});

userDashboardRouter.post('/file-complaint', loggedInController.fileComplaint);
userDashboardRouter.get('/view-complaints', loggedInController.getComplaints);

userDashboardRouter.get('/view-complaintsbyID', (req, res) => { 
  if(req.session.isLoggedIn) 
    res.render('user/view-complaintbyId.ejs', { isLoggedIn: req.session.isLoggedIn});
  else
    res.render('user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn, validationErrors: []});});

userDashboardRouter.post('/view-complaintsbyID', loggedInController.getComplaintsbyID);

module.exports = userDashboardRouter;