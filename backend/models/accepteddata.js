import mongoose from 'mongoose';

const acceptedFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  originalFormId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  acceptedAt: { type: Date, default: Date.now }
}, { collection: 'acceptedForms' });

const AcceptedForm = mongoose.model('AcceptedForm', acceptedFormSchema);

export default AcceptedForm;