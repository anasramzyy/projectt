import mongoose from "mongoose";

mongoose.connect('mongodb+srv://anasramzy00:9i2dsmBjqmFdUZYI@cluster0.usenaxw.mongodb.net/project')
.then(() => {
  console.log("mongodb connected")
})
.catch(() => {
  console.log("failed to connect")
})

export const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  patientHistory: {

  image: {secure_url: String, public_id: String},
  sentAt: { type: Date, default: Date.now },
  result: {
    type: String,
    enum: ['normal', 'included_with_diseases']
  }}
},
{ timestamps: true });


const User = new mongoose.model("users", loginSchema)

export default User