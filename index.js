const express = require('express');
const userDashboard = require('./routes/user-dashboard');
const adminDashboard = require('./routes/admin-dashboard');
const path = require('path');
const {mongoConnect} = require('./utils/databaseUtil');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/index'], (req, res) => {
  res.render('index.ejs');
});

app.use('/user-dashboard',userDashboard);

app.use('/admin-dashboard',adminDashboard);

app.get('/vendor-dashboard', (req, res) => {
  res.render('vendor-dashboard.ejs');
});

app.use((req, res) => {
  res.status(404).render('404.ejs');
});

mongoConnect((client) => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })}
);