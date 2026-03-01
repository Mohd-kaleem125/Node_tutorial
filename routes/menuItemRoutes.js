import express from 'express';
import MenuItem from '../models/MenuItem.js';
const router = express.Router();

// post route to add a menuItem
router.post('/', async (req, res) => {
  try{
  const data = req.body;

  const items = new MenuItem(data);
  const response = await items.save(); // save the data in database
  console.log('data saved.');
  res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({Error: 'Internal server error'});
  }

}); 


// GET method to get the MenuItem data

router.get('/', async(req, res) => {
  try{
    const data = await MenuItem.find();
    console.log('MenuItem fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({Error: 'Internal Server Error'});
  }
});

// Parametrised API calls
router.get('/:taste', async (req, res) => {
  try{
      const taste = req.params.taste; // Extract the work type from the URL parameter
      if(taste == 'Sweet' || taste == 'Spicy' || taste == 'Sour'){
        const response = await MenuItem.find({taste: taste});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({Error: 'Invalid taste Type'});
      }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

export default router;