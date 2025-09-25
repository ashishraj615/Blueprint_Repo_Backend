const express = require('express');
const userDashboardRouter = express.Router();
const loggedInController = require('../controllers/logged-in');
const ensureAuthenticated = require('../controllers/auth');


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

userDashboardRouter.get('/file-complaint', ensureAuthenticated, (req, res) => { 
  console.log("session: ",req.session.isLoggedIn)
  res.status(201).json({isLoggedIn: req.session.isLoggedIn})});

userDashboardRouter.post('/file-complaint', ensureAuthenticated, loggedInController.fileComplaint);
userDashboardRouter.get('/view-complaints', ensureAuthenticated, loggedInController.getComplaints);

userDashboardRouter.get('/view-complaintsbyID', ensureAuthenticated, (req, res) => { 
  if(req.session.isLoggedIn) 
    res.render('user/view-complaintbyId.ejs', { isLoggedIn: req.session.isLoggedIn});
  else
    res.render('user/login-page.ejs', { isLoggedIn: req.session.isLoggedIn, validationErrors: []});});

userDashboardRouter.post('/view-complaintsbyValue', loggedInController.getComplaintsbyID);

module.exports = userDashboardRouter;