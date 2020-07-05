const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: [true,'Name is required']},
  desc: {type: String, trim: true, required: [true,'Description is required']},
  productid: {type: String, trim: true, required: [true,'Description is required']},
  category: {type: String, trim: true, required: [true, 'occupation is required']},
  photo: {type: String}
});

UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', UserSchema);

module.exports = User;
