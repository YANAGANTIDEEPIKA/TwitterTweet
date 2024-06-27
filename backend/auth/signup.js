import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema({
  email: { 
    type: String,
     required: true 
    },
  password: {
     type: String,
      required: true 
    },
    
});

const Signup = mongoose.model('Signup', SignupSchema);

export default Signup;

