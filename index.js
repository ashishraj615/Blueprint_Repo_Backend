const express = require('express');
const userDashboard = require('./routes/user-dashboard');
const adminDashboard = require('./routes/admin-dashboard');
const path = require('path');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config(); // load .env variables

// Example: using PORT from .env
const PORT = process.env.PORT || 3000;

// Example: MongoDB URI from .env
const MONGO_URI = process.env.MONGO_URI;


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
app.use(express.json());

const store = new MongoDbStore({
  uri: String(MONGO_URI),
  collection: 'sessions'
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get(['/', '/index'], (req, res) => {
  res.render('index.ejs', { isLoggedIn: req.session.isLoggedIn});
});

app.use('/user-dashboard',userDashboard);

app.use('/admin-dashboard',adminDashboard);

app.get('/vendor-dashboard', (req, res) => {
  res.render('vendor-dashboard.ejs', { isLoggedIn: req.session.isLoggedIn});
});

app.use((req, res) => {
  res.status(404).render('404.ejs', { isLoggedIn: req.session.isLoggedIn});
});



mongoose.connect(String(MONGO_URI)).then(() => {
  console.log('Database connected successfully to mongoose'); 
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log('Error while connecting to database', err);
});
