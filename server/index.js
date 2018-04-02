const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoUri);

const app = express();

app.use(bodyParser.json()); //parses req.body and makes it available
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize()); //use cookies
app.use(passport.session()); //for authentication

require('./routes/authRoutes')(app); // immediately invoked functions
require('./routes/billingRoutes')(app); //called with app as parameter
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets (main.js or main.css)
  app.use(express.static('client/build'));
  //express will serve up index.html if it doesn't recognize router
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
