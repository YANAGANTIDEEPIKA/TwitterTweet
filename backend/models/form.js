// import mongoose from 'mongoose';

// const formSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
// });

// const Form = mongoose.model('Form', formSchema);

// export default Form;

import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'],default: 'pending' },
 
});

const Form = mongoose.model('Form', formSchema);

export default Form;

