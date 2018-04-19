import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { Crud } from '@utl';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is Required!'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is Required!'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is Required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid Email!'
    }
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is Required!'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    minlength: [6, 'Password need to be longer than 6!']
  },
  userType: {
    type: String,
    required: true
  },
  trainer: {
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModel'
    }]
  },
  student: {
    enrolled: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModel'
    }]
  }
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(timestamp);

const UserModel = mongoose.model('UserModel', UserSchema);
const UserCrud = new Crud(UserModel);

export {
  UserCrud,
  UserModel
};
