
import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'],default: 'pending' },
//  sellerEmail: { type: String, required: true }
name: { type: String, required: true },
image: { type: String, required: true },
description: { type: String, required: true },
category: { type: String, required: true },
price: { type: Number, required: true },
place: { type: String, required: true },
rating: { type: Number, required: true },
status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
sellerEmail: { type: String, required: true }
});

const Form = mongoose.model('Form', formSchema);

export default Form;


