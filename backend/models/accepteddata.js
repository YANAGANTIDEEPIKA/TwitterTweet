// import mongoose from 'mongoose';

// const acceptedFormSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   originalFormId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
//   acceptedAt: { type: Date, default: Date.now }
// }, { collection: 'acceptedForms' });

// const AcceptedForm = mongoose.model('AcceptedForm', acceptedFormSchema);

// export default AcceptedForm;
import mongoose from 'mongoose';

const acceptedFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  place: { type: String, required: true },
  rating: { type: Number, required: true },
  originalFormId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  acceptedAt: { type: Date, default: Date.now },
  comments: [{ comment: String, postedBy: String, postedAt: { type: Date, default: Date.now } }]
}, { collection: 'acceptedForms' });

const AcceptedForm = mongoose.model('AcceptedForm', acceptedFormSchema);

export default AcceptedForm;
