import express from 'express';
import Person from '../models/Person.js';

const router = express.Router();

// Post route to add a person
router.post('/', async(req, res) => {
  try{
    const data = req.body; // Assuming the request body containss the person data

    // create a new person document using the MongoDB model
    const newPerson = new Person(data);
    // save the new person to the database.
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }
  catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal Server Error.'});
  }
});

// GET method to get the person data

router.get('/', async (req, res) => {
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }
});


router.get('/:workType', async (req, res) => {
  try{
     const workType = req.params.workType; // Extract the work type from the URL parameter
     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

          const response = await Person.find({work: workType});
          console.log('response fetched');
          res.status(200).json(response);
     }else{
      res.status(400).json({Error: 'Invalid work Type'});
     }
  }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'});
  }
});


router.put('/:id', async (req, res) => {
  try{
      const personId = req.params.id; //Extract the id from the URL parameter
      const updatePersonData = req.body; // update data for the person

      const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
        new: true, // Return the updated document
        runValidators: true // Run Mongoose validation
      });
    if(!response){
     return res.status(404).json({error: 'person not found'});
    }

      console.log('data updated');
      res.status(200).json(response);

  }catch(err){
    console.log(err);
       res.status(500).json({error: 'Internal server error'});
  }
});


router.delete('/:id', async (req, res) => {
  try{
     const personId = req.params.id;

     // Assuming you have a person model
     const response = await Person.findByIdAndDelete(personId);
     if(!response){
      return res.status(404).json({error: 'person not found'});
     }

     console.log('data deleted');
     res.status(200).json({mesaage: 'person deleted successfully'});

  }catch(err){
     console.log(err);
       res.status(500).json({error: 'Internal server error'});
  }
})

export default router;