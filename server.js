const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

//Body parser configuration
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//Db config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err));

//Let's write our first route
app.get('/', (req, res)=> res.send('Hello'));

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = 8008;
app.listen(port, () => console.log(`Server running on port ${port}`));