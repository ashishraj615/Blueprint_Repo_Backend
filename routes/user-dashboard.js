const express = require('express');
const userDashboardRouter = express.Router();
const loggedInController = require('../controllers/logged-in');


userDashboardRouter.get('/', (req, res) => {
  res.render('user/user-dashboard.ejs');
});

userDashboardRouter.get('/login-page', (req, res) => {
  res.render('user/login-page.ejs');
});

userDashboardRouter.post('/login', loggedInController.getLogin);
userDashboardRouter.post('/file-complaint', loggedInController.fileComplaint);

module.exports = userDashboardRouter;