import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// Define the person schema.

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number
  },

  work:{
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  address: {
    type: String,
  },

  salary:{
    type: Number,
    required: true
  },

  username: {
    required: true,
    type: String
  },

  password: {
    required: true,
    type: String
  }
});

personSchema.pre('save', async function(next) {
  const person = this;

  // Hash the password only if it has been modified (or is new)
  if(!person.isModified('password')) return  next(); 
  try{

    // Hash password generation
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Override the plane password with the hashed one
  person.password = hashedPassword;

  next();
  }catch(err){
    return /* next*/(err); 
  }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
  try{
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }catch(err){
    throw err;
  }
}

// How to work comparePassword method
// create password 
// kaleem ----> bjdhjhfgbjckdhlddhhedgyef15f8
// then put the password login time 
// login ---> Raza ----> this is wrong and how to compare this next step
// take the original password
// bjdhjhfgbjckdhlddhhedgyef15f8 ---> extract salt in this password then
// take salt + wrong pass and hash this pass in another hashed form then compare storehashedPass with the enter pass hasedpass
// salt + Raza ---> hash ---> sdgjdjkwdfjdfjfkgckdcgfdscg5454hdsdjd
// final compare
// salt + Raza ---> hash ---> sdgjdjkwdfjdfjfkgckdcgfdscg5454hdsdjd
// final compare
// bjdhjhfgbjckdhlddhhedgyef15f8 == sdgjdjkwdfjdfjfkgckdcgfdscg5454hdsdjd --> if they match , it indicates that the entered password is correct



// Create Person model
const Person = mongoose.model('Person', personSchema);
export default Person;