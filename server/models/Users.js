const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

//creates collection calles users with schema
mongoose.model('users', userSchema);
