import express from 'express'
import session from 'express-session'
import cloudinary from './cloud.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import User from './connection.js'
import moment from 'moment'
import multer from 'multer'
import sharp from 'sharp'
import tf from '@tensorflow/tfjs'
import bcrypt from 'bcryptjs'


const upload = multer({ dest: '/uploads/' });
const port = 5000


app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", 'ejs')

app.use(express.static("puplic"))

app.get('/', (req, res) => {
  res.render('login')
})


app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/scan', (req, res)=> {
  res.render('scanner')
})

//Patient History
app.get("/history", async (req, res) => {
  // Render whatever view you have to view in the next page //

  res.render('patienthistory')
});


// Logout & Add session destroying
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render('login');
    }
  });
})


app.post("/history/:id", async (req, res) => {
  const id = req.params._id

  // load user from database
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }

  // load image from cloudinary
  const image = await cloudinary.v2.image(user.image.public_id)

  // show the result
  res.json({ image: image,
  sent_at: moment().toISOString(),
  result: prediction})
});


app.post('/signup', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  const existingUser = await User.findOne({email: data.email})

  if(existingUser) {
    res.send("User already exists. please choose a different username.")
  } else {
    const saltRounds = 8
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    data.password = hashedPassword
    const userData = await User.insertMany(data)
    res.render('login')
    console.log(userData)
  }
})


app.post('/login', async (req, res) => {
  try {
    const check = await User.findOne({email: req.body.email})
    if (!check) {
      res.send("email not found")
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
    if (!isPasswordMatch) {
      req.session.user_id = check.id
      res.render('home')
    } else {
      res.send('wrong password')
    }
  } catch {
    res.send('wrong details')
  }
}) 


app.post('/scan', async (req, res) => {
  
  // Process image data from request body
  try {
    const image = await sharp(req.body.image)
      .resize(224, 224)
      .toBuffer();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Invalid image data' });
  }

  // Upload image to Cloudinary
  const id = req.user._id;
  const { secure_url, public_id } = await cloudinary.uploader.upload(image, {
    folder: `users/${id}/profile_pics`,
  });

  // Save URL in database
  const user = await User.findByIdAndUpdate(id, { image: { secure_url, public_id } }, { new: true });

  // Load TensorFlow model
  const model = await tf.loadLayersModel('https://fastapi-lung-cancer.onrender.com/docs#/default/predict_image_predict_post');

  try {
    // Preprocess image
    const tensor = tf.tensor3d(image, [1, 224, 224, 3]);

    // Make predictions using the model
    const predictions = model.predict(tensor);
    const prediction = predictions.dataSync()[0];

    // Return the prediction result
    res.json({
      result: prediction > 0.5 ? 'included_with_diseases' : 'normal',
      sent_at: moment().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))