
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// import Form from './models/form.js';
// import Signup from './auth/signup.js';
// import Seller from './auth/seller.js'
// import AcceptedForm from './models/accepteddata.js'; 
// const app = express();
// const PORT = 1432;

// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb+srv://21mh1a4265:fh4pwS7WIVP5pCEi@cluster0.vovrpo5.mongodb.net/Cluster0?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Connected to Database & Listening to localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// app.use('/uploads', express.static('uploads'));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// // app.get('/api/forms', async (req, res) => {
// //   try {
// //     const forms = await Form.find();
// //     res.json(forms);
// //   } catch (error) {
// //     console.error('Error fetching form data:', error);
// //     res.status(500).json({ error: 'Failed to fetch form data' });
// //   }
// // });
// app.get('/api/forms', async (req, res) => {
//   try {
//     const forms = await Form.find().select('name image description category price place rating status sellerEmail');
//     res.json(forms);
//   } catch (error) {
//     console.error('Error fetching form data:', error);
//     res.status(500).json({ error: 'Failed to fetch form data' });
//   }
// });
// app.post('/api/forms', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description, category, price, place, rating, email } = req.body;
//     const image = req.file.filename;

//     const newForm = new Form({
//       name,
//       description,
//       category,
//       price,
//       place,
//       rating,
//       image,
//       status: 'pending',
//       sellerEmail: email
//     });

//     const savedForm = await newForm.save();
//     res.status(201).json(savedForm);
//   } catch (error) {
//     console.error('Error saving form data:', error);
//     res.status(500).json({ error: 'Failed to save form data' });
//   }
// });
// // app.patch('/api/forms/:id/accept', async (req, res) => {
// //   const session = await mongoose.startSession();
// //   session.startTransaction();
// //   try {
// //     const { id } = req.params;
// //     const form = await Form.findById(id);

// //     if (!form) {
// //       throw new Error('Form not found');
// //     }

// //     const acceptedForm = new AcceptedForm({
// //       name: form.name,
// //       image: form.image,
// //       originalFormId: form._id
// //     });

// //     await acceptedForm.save({ session });

// //     form.status = 'accepted';
// //     await form.save({ session });

// //     await session.commitTransaction();
// //     session.endSession();

// //     res.json(form);
// //   } catch (error) {
// //     await session.abortTransaction();
// //     session.endSession();

// //     console.error('Error accepting form:', error);
// //     res.status(500).json({ error: 'Failed to accept form' });
// //   }
// // });
// app.patch('/api/forms/:id/accept', async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { id } = req.params;
//     const form = await Form.findById(id);

//     if (!form) {
//       throw new Error('Form not found');
//     }

//     const acceptedForm = new AcceptedForm({
//       name: form.name,
//       description: form.description,
//       image: form.image,
//       category: form.category,
//       price: form.price,
//       place: form.place,
//       rating: form.rating,
//       originalFormId: form._id
//     });

//     await acceptedForm.save({ session });

//     form.status = 'accepted';
//     await form.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     res.json(form);
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();

//     console.error('Error accepting form:', error);
//     res.status(500).json({ error: 'Failed to accept form' });
//   }
// });

// app.patch('/api/forms/:id/reject', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const form = await Form.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
//     res.json(form);
//   } catch (error) {
//     console.error('Error rejecting form:', error);
//     res.status(500).json({ error: 'Failed to reject form' });
//   }
// });

// app.get('/api/acceptedForms', async (req, res) => {
//   try {
//     const acceptedForms = await AcceptedForm.find();
//     res.json(acceptedForms);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
// // Endpoint to fetch a random set of 4 accepted forms
// app.get('/api/randomAcceptedForms', async (req, res) => {
//   try {
//     const acceptedForms = await AcceptedForm.aggregate([{ $sample: { size: 4 } }]);
//     res.json(acceptedForms);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }

// });
// //signup
// // app.post('/signup', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Check if email already exists
// //     const existingUser = await Signup.findOne({ email });

// //     if (existingUser) {
// //       return res.status(400).json({ error: 'Email already exists' });
// //     }

// //     // Create new user using Signup model
// //     const newUser = new Signup({ email, password });
// //     await newUser.save();

// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (error) {
// //     console.error('Error signing up:', error);
// //     res.status(500).json({ error: 'Failed to sign up' });
// //   }
// // });
// app.post('/signup', async (req, res) => {
//   const { name,email, password, age, phoneNumber, address } = req.body;

//   try {
//     // Check if email already exists
//     const existingUser = await Signup.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Create new user using Signup model
//     const newUser = new Signup({ name,email, password, age, phoneNumber, address });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ error: 'Failed to sign up' });
//   }
// });

// //signin
// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await Signup.findOne({ email, password });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     res.status(200).json({ message: 'Sign in successful', email: user.email });
//   } catch (error) {
//     console.error('Error during sign in:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// //getting email
// app.get('/signin/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const user = await Signup.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json({ email: user.email });
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Failed to fetch user data' });
//   }
// });

// // Signup route for sellers
// app.post('/sellersignup', async (req, res) => {
//   const { name, email, phoneNumber, password, age } = req.body;

//   try {
//     // Check if email already exists
//     const existingSeller = await Seller.findOne({ email });

//     if (existingSeller) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Create new seller using Seller model
//     const newSeller = new Seller({ name, email, phoneNumber, password, age });
//     await newSeller.save();

//     res.status(201).json({ message: 'Seller registered successfully' });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ error: 'Failed to sign up' });
//   }
// });

// // Signin route for sellers
// app.post('/sellersignin', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const seller = await Seller.findOne({ email, password });

//     if (!seller) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//     res.status(200).json({ message: 'Sign in successful', email: seller.email });
//   } catch (error) {
//     console.error('Error during sign in:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// // Endpoint to get seller's name by email
// app.get('/sellersignin/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     const seller = await Seller.findOne({ email });
//     if (!seller) {
//       return res.status(404).json({ error: 'Seller not found' });
//     }
//     res.status(200).json({ name: seller.email });
//   } catch (error) {
//     console.error('Error fetching seller data:', error);
//     res.status(500).json({ error: 'Failed to fetch seller data' });
//   }
// });

// export default app;

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import Form from './models/form.js';
import Signup from './auth/signup.js';
import Seller from './auth/seller.js';
import Comment from './models/comment.js'
import AcceptedForm from './models/accepteddata.js'; 
const app = express();
const PORT = 1432;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://21mh1a4265:fh4pwS7WIVP5pCEi@cluster0.vovrpo5.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to Database & Listening to localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find().select('name image description category price place rating status sellerEmail');
    res.json(forms);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
});
app.get('/api/acceptedForms', async (req, res) => {
  const { place, name } = req.query;
  let query = {};
  if (place) {
    query.place = { $regex: place, $options: 'i' };
  }
  if (name) {
    query.$or = [
      { name: { $regex: name, $options: 'i' } },
      { description: { $regex: name, $options: 'i' } }
    ];
  }
  try {
    const acceptedForms = await AcceptedForm.find(query);
    res.json(acceptedForms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/forms', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, place, rating, email } = req.body;
    const image = req.file.filename;

    const newForm = new Form({
      name,
      description,
      category,
      price,
      place,
      rating,
      image,
      status: 'pending',
      sellerEmail: email
    });

    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

app.patch('/api/forms/:id/accept', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      throw new Error('Form not found');
    }

    const acceptedForm = new AcceptedForm({
      name: form.name,
      description: form.description,
      image: form.image,
      category: form.category,
      price: form.price,
      place: form.place,
      rating: form.rating,
      originalFormId: form._id
    });

    await acceptedForm.save({ session });

    form.status = 'accepted';
    await form.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json(form);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error accepting form:', error);
    res.status(500).json({ error: 'Failed to accept form' });
  }
});

app.patch('/api/forms/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
    res.json(form);
  } catch (error) {
    console.error('Error rejecting form:', error);
    res.status(500).json({ error: 'Failed to reject form' });
  }
});

app.get('/api/acceptedForms', async (req, res) => {
  try {
    const acceptedForms = await AcceptedForm.find();
    res.json(acceptedForms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});
// Endpoint to fetch a random set of 4 accepted forms
app.get('/api/randomAcceptedForms', async (req, res) => {
  try {
    const acceptedForms = await AcceptedForm.aggregate([{ $sample: { size: 4 } }]);
    res.json(acceptedForms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

});

app.post('/signup', async (req, res) => {
  const { name,email, password, age, phoneNumber, address } = req.body;

  try {
    // Check if email already exists
    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user using Signup model
    const newUser = new Signup({ name,email, password, age, phoneNumber, address });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

//signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Sign in successful', email: user.email });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//getting email
app.get('/signin/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Signup route for sellers
app.post('/sellersignup', async (req, res) => {
  const { name, email, phoneNumber, password, age } = req.body;

  try {
    // Check if email already exists
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new seller using Seller model
    const newSeller = new Seller({ name, email, phoneNumber, password, age });
    await newSeller.save();

    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

// Signin route for sellers
app.post('/sellersignin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email, password });

    if (!seller) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Sign in successful', email: seller.email });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Endpoint to get seller's name by email
app.get('/sellersignin/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json({ name: seller.email });
  } catch (error) {
    console.error('Error fetching seller data:', error);
    res.status(500).json({ error: 'Failed to fetch seller data' });
  }
});
//chatbox
const categories = [
  { main: "clothes", types: ["shorts", "frocks", "shirts", "pants"] },
  { main: "food", types: ["snacks", "meals", "desserts"] },
  { main: "grocery", types: ["fruits", "vegetables", "spices"] },
  // Add more categories and their types as needed
];

let answer = "";
let relatedImages = [];

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    // Clear previous answers and related images
    answer = "";
    relatedImages = [];

    // Split the question into words
    const words = question.toLowerCase().split(/\s+/);

    // Check if any word matches a category or type
    let matchedCategory = null;
    let matchedType = null;

    for (const word of words) {
      for (const category of categories) {
        if (word.includes(category.main)) {
          matchedCategory = category.main;
          for (const type of category.types) {
            if (word.includes(type)) {
              matchedType = type;
              break;
            }
          }
          break;
        }
      }
      if (matchedCategory) break;
    }

    if (matchedCategory) {
      const query = {
        category: matchedCategory,
        $or: [
          { name: { $regex: new RegExp(matchedType || "", "i") } },
          { description: { $regex: new RegExp(matchedType || "", "i") } },
        ],
      };
      relatedImages = await AcceptedForm.find(query);
      answer = `Here are the images related to ${matchedType || matchedCategory}:`;
    } else {
      // Handle case when no category matches
      const query = {
        $or: [
          { name: { $regex: new RegExp(question, "i") } },
          { description: { $regex: new RegExp(question, "i") } },
          { category: { $regex: new RegExp(question, "i") } },
        ],
      };
      relatedImages = await AcceptedForm.find(query);
      answer = relatedImages.length > 0 ? "" : "Sorry, I couldn't find any relevant information.";
    }

    res.json({ answer, relatedImages });
  } catch (error) {
    console.error("Error fetching image details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Endpoint to post a comment for an AcceptedForm
app.post('/api/acceptedForms/:acceptedFormId/comments', async (req, res) => {
  try {
    const { acceptedFormId } = req.params;
    const { email, comment } = req.body;

    // Create a new Comment instance
    const newComment = new Comment({ acceptedFormId, email, comment });
    await newComment.save();

    // Fetch updated comments for the accepted form
    const updatedComments = await Comment.find({ acceptedFormId });
    res.status(201).json(updatedComments);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});
// Endpoint to fetch comments for a specific AcceptedForm
app.get('/api/acceptedForms/:acceptedFormId/comments', async (req, res) => {
  try {
    const { acceptedFormId } = req.params;
    const comments = await Comment.find({ acceptedFormId });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});
app.get('/:formId/comments', async (req, res) => {
  try {
    const { formId } = req.params;
    const acceptedForm = await AcceptedForm.findById(formId).populate('comments');
    if (!acceptedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(acceptedForm.comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default app;
