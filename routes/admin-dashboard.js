const express = require('express');
const adminDashboardRouter = express.Router();

adminDashboardRouter.get('/', (req, res) => {
  res.render('admin-dashboard.ejs', { isLoggedIn: req.session.isLoggedIn});
});


module.exports = adminDashboardRouter;