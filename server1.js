import express from 'express'
//const app = express();
//const express = require('expres')
import db from './connectMongodbServerToNodejs.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//import Person from './models/Person.js';
import MenuItem from './models/MenuItem.js';


// Built-in body parser (modern way).

app.use(express.json());
app.use(express.urlencoded({extended:true
}));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Welcome to my hotel.. How can i help you?');
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
app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);



app.listen(PORT, () => {
 // console.log(('Server is running on http://localhost:3000'));
 console.log('Listening on port 3000');
  
});