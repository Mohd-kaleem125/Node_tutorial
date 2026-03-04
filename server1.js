import express from 'express'
//const app = express();
//const express = require('expres')
import db from './connectMongodbServerToNodejs.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();


//const LocalStrategy = require('passport-local').Strategy; this is not allow in ES6 module
// This is allow syntax in ES6
import passport from './Authentication.js';

//import Person from './models/Person.js';
import MenuItem from './models/MenuItem.js';


// Built-in body parser (modern way).

app.use(express.json());
app.use(express.urlencoded({extended:true
}));

const PORT = process.env.PORT || 3000;

// Middleware Function.

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Mode to : ${req.originalUrl}`);
  next();  // Move on to the next phase.
}

app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/', logRequest, (req, res) => {
  res.send('Hello Welcome to my hotel.. How can i help you?');
});


// Extra

app.post('/login', (req, res, next) => {

  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    return res.status(200).json({
      message: "Login successful",
      user: user.username
    });

  })(req, res, next);

});
/* app.get('/chicken', (req, res) => {
  res.send('Sure sir, i would love to serve chicken')
});

app.get('/idli', (req, res) => {
  let customized_idli = {
    name: 'rava idli',
    size: '10 cm diameter',
    is_sambhar: true,
    is_chutney: false,
  }
 // res.send('Welcome to south india and would love to serve IDLI');
 res.send(customized_idli);
});

app.post('/items', (req, res) => {
  res.send('data is saved..');
} )
  */



// Import the router files
import personRoutes from './routes/personRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js';

// Use the routers
app.use('/person',  personRoutes);
app.use('/menuItem',  menuItemRoutes);



app.listen(PORT, () => {
 // console.log(('Server is running on http://localhost:3000'));
 console.log('Listening on port 3000');
  
});