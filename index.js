const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const eis = 90385287;
const password = '2025-08-07';

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/login', (req, res) => {
  const { username, password: userPassword, empno } = req.body;
  if (username == eis && userPassword == password) {
    console.log('Login successful', { username, empno });
    res.render('new-complaint.ejs', { empno });
  } else {
    console.log('Login failed');
    res.render('login-page.ejs');
  }
});

app.post('/file-complaint', (req, res) => {
  console.log(req.body);
  const { location, empno, desc, email } = req.body;
  console.log('Complaint filed:', { location, empno, desc, email });
  res.render('new-complaint.ejs',{empno});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});