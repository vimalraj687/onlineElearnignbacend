import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, enum: [0, 1], default: 0 } // 0 for user, 1 for admin
});

const User = mongoose.model('User', userSchema);

export default User;


// import mongoose from 'mongoose';

// const userSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// export default User;
