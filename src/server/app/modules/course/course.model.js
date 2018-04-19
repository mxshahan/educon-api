import mongoose, { Schema } from 'mongoose';
// import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { Crud } from '@utl';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is Required!!']
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Category is required!']
  },
  price: {
    type: Number
  },
  media: {
    link: [{
      type: String
    }]
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  enrolled: {
    student: [{
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    }]
  }
});

CourseSchema.plugin(uniqueValidator);
CourseSchema.plugin(timestamp);

const CourseModel = mongoose.model('CourseModel', CourseSchema);
const CourseCrud = new Crud(CourseModel);

export {
  CourseCrud,
  CourseModel
};
