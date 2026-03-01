import express from 'express'
const app = express();
//const express = require('expres')
import db from './connectMongodbServerToNodejs.js';

//import Person from './models/Person.js';
import MenuItem from './models/MenuItem.js';
import { error } from 'console';

// Built-in body parser (modern way).

app.use(express.json());
app.use(express.urlencoded({extended:true
}));



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

app.listen(3000, () => {
  console.log(('Server is running on http://localhost:3000'));
  
});