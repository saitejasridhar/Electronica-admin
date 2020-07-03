const User = require('../models/user.model');

exports.getUsers = async function() {
  try {
    return await User.find({});
  } catch (e) {
    console.error(`[error] ${e}`);
    throw Error('Error while fetching users')
  }
};

exports.getUser = async function(userId) {
  try {
    return await User.find({_id: userId});
  } catch (e) {
    console.error(`[error] ${e}`);
    throw Error('Error while fetching user')
  }
};

exports.getUserByEmail = async function(email) {
  try {
    return await User.findOne({email: email});
  } catch (e) {
    console.error(`[error] ${e}`);
    throw Error('Error while fetching by email address');
  }
};

exports.createUser = async function(user){
  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    occupation: user.occupation,
    dateOfBirth: user.dateOfBirth,
    photo: user.photo
  });
  try {
    return await newUser.save()
  } catch(e) {
    console.error(`[error] ${e}`);
    if(e.name === 'ValidationError') {
      throw Error(e.message);
    } else {
      throw Error('Error while creating user');
    }
  }
};

exports.updateUser = async function(user){
  const id = user.id;
  let oldUser;

  try {
    oldUser = await User.findById(id);
  } catch(e) {
    throw Error('Error occurred while finding user');
  }

  if(!oldUser){
    return false;
  }

  oldUser.firstName = user.firstName;
  oldUser.lastName = user.lastName;
  oldUser.email = user.email;
  oldUser.occupation = user.occupation;
  oldUser.dateOfBirth = user.dateOfBirth;
  oldUser.photo = user.photo;

  try {
    return await oldUser.save();
  } catch(e) {
    console.error(`[error] ${e}`);
    if(e.name === 'ValidationError') {
      throw Error(e.message);
    } else {
      throw Error('Error while updating user');
    }
  }
};

exports.deleteUser = async function(id) {
  try{
    const deleted = await User.remove({_id: id});
    if(deleted.n === 0){
      console.error('User could not be deleted');
      throw Error('User could not be deleted');
    }
    return deleted;
  } catch(e) {
      console.error(`[error] ${e}`);
      throw Error('Error occurred while deleting the User');
  }
};
